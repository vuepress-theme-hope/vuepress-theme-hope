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

<script>
import {
  globalEncryptStatus,
  pathEncryptStatus,
  pathHitKeys
} from '@theme/util/encrypt';
import BlogPage from '@theme/components/BlogPage.vue';
import Home from '@theme/components/Home.vue';
import Navbar from '@theme/components/Navbar.vue';
import Page from '@theme/components/Page.vue';
import Password from '@theme/components/Password.vue';
import Sidebar from '@parent-theme/components/Sidebar.vue';
import { resolveSidebarItems } from '@theme/util';

export default {
  components: { BlogPage, Home, Page, Password, Sidebar, Navbar },

  data: () => ({
    isSidebarOpen: false,
    globalPassword: '',
    passwordConfig: {}
  }),

  computed: {
    /** 是否全局加密 */
    globalEncrypt() {
      return globalEncryptStatus(
        this.$themeConfig.encrypt,
        this.globalPassword
      );
    },

    /** 当前路径命中的键值 */
    currentPathHitKeys() {
      return pathHitKeys(this.$themeConfig.encrypt, this.$route.path);
    },

    /** 路径是否加密 */
    currentPathEncrypt() {
      return pathEncryptStatus(
        this.$themeConfig.encrypt,
        this.$route.path,
        this.passwordConfig
      );
    },

    shouldShowNavbar() {
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
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page;

      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      );
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },

    pageClasses() {
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
  },

  mounted() {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen;
      this.$emit('toggle-sidebar', this.isSidebarOpen);
    },

    // Side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40)
        if (dx > 0 && this.touchStart.x <= 80) this.toggleSidebar(true);
        else this.toggleSidebar(false);
    },

    /** 设置密码 */
    setPassword(password) {
      const { config } = this.$themeConfig.encrypt;

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
};
</script>
