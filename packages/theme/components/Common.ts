import { getSidebarItems } from "@theme/utils/sidebar";
import { globalEncryptMixin } from "@theme/mixins/globalEncrypt";
import Navbar from "@theme/components/Navbar/Navbar.vue";
import PageFooter from "@theme/components/PageFooter.vue";
import Password from "@theme/components/Password.vue";
import { PageHeader } from "@mr-hope/vuepress-types";
import Sidebar from "@theme/components/Sidebar/Sidebar.vue";
import throttle from "lodash.throttle";

import type { SidebarItem, SidebarHeader } from "@theme/utils/sidebar";

export default globalEncryptMixin.extend({
  name: "Common",

  components: {
    Navbar,
    PageFooter,
    Password,
    Sidebar,
  },

  props: {
    navbar: { type: Boolean, default: true },
    sidebar: { type: Boolean, default: true },
  },

  data: () => ({
    isSidebarOpen: false,
    hideNavbar: false,
    touchStart: {
      clientX: 0,
      clientY: 0,
    },
  }),

  computed: {
    enableNavbar(): boolean {
      if (this.navbar === false) return false;

      const { frontmatter } = this.$page;

      if (frontmatter.navbar === false || this.$themeConfig.navbar === false)
        return false;

      return Boolean(
        this.$title ||
          this.$themeConfig.logo ||
          this.$themeConfig.repo ||
          this.$themeConfig.nav ||
          this.$themeLocaleConfig.nav
      );
    },

    enableSidebar(): boolean {
      if (this.sidebar === false) return false;

      return (
        !this.$frontmatter.home &&
        this.$frontmatter.sidebar !== false &&
        this.sidebarItems.length !== 0
      );
    },

    sidebarItems(): SidebarItem[] {
      if (this.sidebar === false) return [];

      return getSidebarItems(this.$page, this.$site, this.$localePath);
    },

    pageClasses(): unknown {
      const userPageClass = this.$page.frontmatter.pageClass as
        | string
        | string[]
        | Record<string, boolean>;

      return [
        {
          "has-navbar": this.enableNavbar,
          "has-sidebar": this.enableSidebar,
          "has-anchor": this.enableAnchor,
          "hide-navbar": this.hideNavbar,
          "sidebar-open": this.isSidebarOpen,
        },
        userPageClass,
      ];
    },

    headers(): SidebarHeader[] {
      return this.getHeader(this.sidebarItems);
    },

    enableAnchor(): boolean {
      return (
        this.$frontmatter.anchorDisplay ||
        (this.$themeConfig.anchorDisplay !== false &&
          this.$frontmatter.anchorDisplay !== false)
      );
    },
  },

  mounted(): void {
    let lastDistance = 0;

    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });

    window.addEventListener(
      "scroll",
      throttle(() => {
        const distance = this.getScrollTop();

        // scroll down
        if (lastDistance < distance && distance > 58) {
          if (!this.isSidebarOpen) this.hideNavbar = true;
          // scroll up
        } else this.hideNavbar = false;

        lastDistance = distance;
      }, 300)
    );
  },

  methods: {
    /** Get scroll distance */
    getScrollTop(): number {
      return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    },

    toggleSidebar(to: boolean): void {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
    },

    // Side swipe
    onTouchStart(event: TouchEvent): void {
      this.touchStart = {
        clientX: event.changedTouches[0].clientX,
        clientY: event.changedTouches[0].clientY,
      };
    },

    onTouchEnd(event: TouchEvent): void {
      const dx = event.changedTouches[0].clientX - this.touchStart.clientX;
      const dy = event.changedTouches[0].clientY - this.touchStart.clientY;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40)
        if (dx > 0 && this.touchStart.clientX <= 80) this.toggleSidebar(true);
        else this.toggleSidebar(false);
    },

    getHeader(items: SidebarItem[]): SidebarHeader[] {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item.type === "group") {
          const matching: PageHeader[] = this.getHeader(
            item.children as SidebarItem[]
          );

          if (matching.length !== 0) return matching;
        } else if (
          item.type === "page" &&
          item.headers &&
          item.path === this.$route.path
        )
          return item.headers;
      }

      return [];
    },
  },
});
