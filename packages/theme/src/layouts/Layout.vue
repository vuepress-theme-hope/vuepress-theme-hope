<template>
  <div
    :class="pageClasses"
    class="theme-container"
    @touchend="onTouchEnd"
    @touchstart="onTouchStart"
  >
    <Password v-if="globalEncrypt && !globalDescrypted" @enter="globalPassword = $event.value" />
    <template v-else>
      <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

      <div class="sidebar-mask" @click="toggleSidebar(false)" />

      <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
        <slot slot="top" name="sidebar-top" />
        <slot slot="bottom" name="sidebar-bottom" />
      </Sidebar>

      <Password
        v-if="configEncrypt && !configDescrypted && !globalDescrypted"
        @enter="setPassword"
      />

      <Home v-else-if="$page.frontmatter.home" />

      <Page v-else :sidebar-items="sidebarItems">
        <slot slot="top" name="page-top" />
        <slot slot="bottom" name="page-bottom" />
      </Page>
    </template>
  </div>
</template>

<script>
import Home from '@theme/components/Home.vue';
import Navbar from '@theme/components/Navbar.vue';
import Page from '@theme/components/Page.vue';
import Password from '@theme/components/Password.vue';
import Sidebar from '@parent-theme/components/Sidebar.vue';
import { resolveSidebarItems } from '@theme/util';

export default {
  components: { Home, Page, Password, Sidebar, Navbar },

  data: () => ({
    isSidebarOpen: false,
    globalPassword: '',
    passwordConfig: {}
  }),

  computed: {
    /** 加密选项 */
    encryptOption() {
      return this.$themeConfig.encrypt || {};
    },

    /** 是否全局加密 */
    globalEncrypt() {
      return Boolean(this.encryptOption.globalEncrypt);
    },

    /** 是否已经解密 */
    globalDescrypted() {
      if (this.globalEncrypt) {
        const { global } = this.encryptOption;
        /** 全局密码 */
        const globalPassword = typeof global === 'string' ? [global] : global;

        /** 全局密码匹配结果 */
        const result = globalPassword.filter(
          password => this.globalPassword === password
        );

        return result.length !== 0;
      }

      return false;
    },

    /** 配置项命中项 */
    encryptHitItems() {
      if (typeof this.encryptOption.config === 'object') {
        /** 配置键名 */
        const keys = Object.keys(this.encryptOption.config);

        /** 命中键名 */
        const hitKeys = keys.filter(key => this.$route.path.indexOf(key) === 0);

        return hitKeys.sort((x, y) => y.length - x.length);
      }

      return [];
    },

    /** 由配置项判断是否加密 */
    configEncrypt() {
      return this.encryptHitItems.length !== 0;
    },

    /** 当前命中配置项是否已经解密 */
    configDescrypted() {
      if (this.configEncrypt) {
        /** 配置项 */
        const { config } = this.encryptOption;

        /** 正确键值 */
        const correctKeys = this.encryptHitItems.filter(key => {
          /** 命中的密码 */
          const hitPasswords =
            typeof config[key] === 'string' ? [config[key]] : config[key];

          /** 比较结果 */
          const result = hitPasswords.filter(
            password => this.passwordConfig[key] === password
          );

          return result.length !== 0;
        });

        return correctKeys.length !== 0;
      }

      return false;
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
      const { config } = this.encryptOption;

      for (let i = 0; i < this.encryptHitItems.length; i++) {
        /** 命中键值 */
        const hitKey = this.encryptHitItems[i];
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
