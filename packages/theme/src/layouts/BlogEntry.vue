<template>
  <div
    :class="pageClasses"
    class="theme-container"
    @touchend="onTouchEnd"
    @touchstart="onTouchStart"
  >
    <!-- 密码弹窗 -->
    <Password v-if="globalEncrypt && !globalDescrypted" @enter="globalPassword = $event.value" />
    <!-- 内容 -->
    <template v-else>
      <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

      <div class="sidebar-mask" @click="toggleSidebar(false)" />

      <Sidebar :items="[]" @toggle-sidebar="toggleSidebar">
        <slot slot="top" name="sidebar-top" />
        <slot slot="bottom" name="sidebar-bottom" />
      </Sidebar>

      <component :is="componentName" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Category from '@theme/layouts/Category.vue';
import { EncryptOptions } from '../../types';
import Navbar from '@theme/components/Navbar.vue';
import Password from '@theme/components/Password.vue';
import Sidebar from '@theme/components/Sidebar.vue';
import Tag from '@theme/layouts/Tag.vue';
import { capitalize } from '@mr-hope/vuepress-shared-utils';

@Component({ components: { Category, Password, Sidebar, Navbar, Tag } })
export default class BlogEntry extends Vue {
  private isSidebarOpen = false;

  private globalPassword = '';

  private touchStart: Record<string, number> = {};

  private get componentName() {
    const links = this.$route.path.split('/');

    if (links.length === 2 || links.length === 3 || (links.length === 4 && links[3] === ''))
      return `${capitalize(links[1])}`;

    console.error(`[vuepress-theme-hope]: Can not resolve blog components at ${this.$route.path}`);

    return 'Layout';
  }

  /** 加密选项 */
  private get encryptOption(): EncryptOptions {
    return this.$themeConfig.encrypt || {};
  }

  /** 是否全局加密 */
  private get globalEncrypt() {
    return Boolean(this.encryptOption.globalEncrypt);
  }

  /** 是否已经解密 */
  private get globalDescrypted() {
    if (this.globalEncrypt) {
      const { global } = this.encryptOption;
      /** 全局密码 */
      const globalPassword = typeof global === 'string' ? [global] : global;

      /** 全局密码匹配结果 */
      const result = (globalPassword as string[]).filter(
        password => this.globalPassword === password
      );

      return result.length !== 0;
    }

    return false;
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

  private get pageClasses() {
    const userPageClass = this.$page.frontmatter.pageClass;

    return [
      {
        'no-navbar': !this.shouldShowNavbar,
        'sidebar-open': this.isSidebarOpen,
        'no-sidebar': true
      },
      userPageClass
    ];
  }

  private mounted() {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  }

  private toggleSidebar(to: string | boolean) {
    this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen;
    this.$emit('toggle-sidebar', this.isSidebarOpen);
  }

  // Side swipe
  private onTouchStart(event: TouchEvent) {
    this.touchStart = {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY
    };
  }

  private onTouchEnd(event: TouchEvent) {
    const dx = event.changedTouches[0].clientX - this.touchStart.x;
    const dy = event.changedTouches[0].clientY - this.touchStart.y;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40)
      if (dx > 0 && this.touchStart.x <= 80) this.toggleSidebar(true);
      else this.toggleSidebar(false);
  }
}
</script>

<style lang="stylus" scoped>
.tags-wrapper
  max-width 740px
  margin 0 auto
  padding 4.6rem 2.5rem 0

@media (max-width: $MQMobile)
  .tags-wrapper
    padding 5rem 0.6rem 0
</style>
