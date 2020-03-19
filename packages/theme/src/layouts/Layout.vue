<template>
  <div
    :class="pageClasses"
    class="theme-container"
    @touchend="onTouchEnd"
    @touchstart="onTouchStart"
  >
    <!-- 密码弹窗 -->
    <Password v-if="globalEncrypt" @enter="globalPassword = $event.value" />
    <!-- 内容 -->
    <template v-else>
      <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

      <div class="sidebar-mask" @click="toggleSidebar(false)" />

      <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
        <slot slot="top" name="sidebar-top" />
        <slot slot="bottom" name="sidebar-bottom" />
      </Sidebar>

      <Password v-if="currentPathEncrypt && !globalEncrypt" @enter="setPassword" />

      <BlogPage v-else-if="$page.frontmatter.blogpage" />

      <Home v-else-if="$page.frontmatter.home" />

      <Page v-else :sidebar-items="sidebarItems">
        <slot slot="top" name="page-top" />
        <slot slot="bottom" name="page-bottom" />
      </Page>
    </template>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  globalEncryptStatus,
  pathEncryptStatus,
  pathHitKeys
} from '@theme/util/encrypt';
import BlogPage from '@theme/components/BlogPage.vue';
import { EncryptOptions } from '../../types';
import Home from '@theme/components/Home.vue';
import Navbar from '@theme/components/Navbar.vue';
import Page from '@theme/components/Page.vue';
import Password from '@theme/components/Password.vue';
import Sidebar from '@theme/components/Sidebar.vue';
import { resolveSidebarItems } from '@theme/util/resolve';

@Component({ components: { BlogPage, Home, Page, Password, Sidebar, Navbar } })
export default class Layout extends Vue {
  private isSidebarOpen = false;

  private globalPassword = '';

  private passwordConfig: Record<string, string> = {};

  private touchStart: Record<string, number> = {};

  /** 是否全局加密 */
  private get globalEncrypt() {
    return globalEncryptStatus(this.$themeConfig.encrypt, this.globalPassword);
  }

  /** 当前路径命中的键值 */
  private get currentPathHitKeys() {
    return pathHitKeys(this.$themeConfig.encrypt, this.$route.path);
  }

  /** 路径是否加密 */
  private get currentPathEncrypt() {
    return pathEncryptStatus(
      this.$themeConfig.encrypt,
      this.$route.path,
      this.passwordConfig
    );
  }

  private get shouldShowNavbar() {
    const { frontmatter } = this.$page;

    if (frontmatter.navbar === false || this.$themeConfig.navbar === false)
      return false;

    return (
      this.$title ||
      this.$themeConfig.logo ||
      this.$themeConfig.repo ||
      this.$themeConfig.nav ||
      this.$themeLocaleConfig.nav
    );
  }

  private get shouldShowSidebar() {
    const { frontmatter } = this.$page;

    return (
      !frontmatter.home &&
      frontmatter.sidebar !== false &&
      this.sidebarItems.length
    );
  }

  private get sidebarItems() {
    return resolveSidebarItems(
      this.$page,
      this.$page.regularPath,
      this.$site,
      this.$localePath
    );
  }

  private get pageClasses() {
    const userPageClass = this.$page.frontmatter.pageClass;

    return [
      {
        'no-navbar': !this.shouldShowNavbar,
        'sidebar-open': this.isSidebarOpen,
        'no-sidebar': !this.shouldShowSidebar
      },
      userPageClass
    ];
  }

  private mounted() {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  }

  private toggleSidebar(to: any) {
    this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen;
    this.$emit('toggle-sidebar', this.isSidebarOpen);
  }

  // Side swipe
  private onTouchStart(e: TouchEvent) {
    this.touchStart = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };
  }

  private onTouchEnd(e: TouchEvent) {
    const dx = e.changedTouches[0].clientX - this.touchStart.x;
    const dy = e.changedTouches[0].clientY - this.touchStart.y;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40)
      if (dx > 0 && this.touchStart.x <= 80) this.toggleSidebar(true);
      else this.toggleSidebar(false);
  }

  /** 设置密码 */
  private setPassword(password: string) {
    const { config } = this.$themeConfig.encrypt as Required<EncryptOptions>;

    for (const hitKey of this.currentPathHitKeys) {
      /** 命中密码配置 */
      const hitPassword = config[hitKey];
      /** 命中密码列表 */
      const hitPasswordList =
        typeof hitPassword === 'string' ? [hitPassword] : hitPassword;
      /** 比较结果 */
      const result = hitPasswordList.filter(item => password === item);

      // 出现匹配
      if (result.length !== 0) {
        this.$set(this.passwordConfig, hitKey, password);

        break;
      }
    }
  }
}
</script>
