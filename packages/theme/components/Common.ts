import { Component, Mixins, Prop } from "vue-property-decorator";
import {
  SidebarItem,
  SidebarHeader,
  getSidebarItems,
} from "@theme/util/sidebar";
import GlobalEncryptMixin from "@theme/util/globalEncryptMixin";
import Navbar from "@theme/components/Navbar.vue";
import PageFooter from "@theme/components/PageFooter.vue";
import Password from "@theme/components/Password.vue";
import { PageHeader } from "@mr-hope/vuepress-types";
import Sidebar from "@theme/components/Sidebar.vue";
import throttle from "lodash.throttle";

@Component({ components: { PageFooter, Password, Sidebar, Navbar } })
export default class Common extends Mixins(GlobalEncryptMixin) {
  @Prop({ type: Boolean, default: true })
  private readonly navbar!: boolean;

  @Prop({ type: Boolean, default: true })
  private readonly sidebar!: boolean;

  private isSidebarOpen = false;

  private hideNavbar = false;

  private touchStart: { clientX: number; clientY: number } = {
    clientX: 0,
    clientY: 0,
  };

  private get enableNavbar(): boolean {
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
  }

  private get enableSidebar(): boolean {
    if (this.sidebar === false) return false;

    return (
      !this.$frontmatter.home &&
      this.$frontmatter.sidebar !== false &&
      this.sidebarItems.length !== 0
    );
  }

  private get sidebarItems(): SidebarItem[] {
    if (this.sidebar === false) return [];

    return getSidebarItems(this.$page, this.$site, this.$localePath);
  }

  private get pageClasses(): unknown {
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
  }

  private get headers(): SidebarHeader[] {
    return this.getHeader(this.sidebarItems);
  }

  private get enableAnchor(): boolean {
    return this.$themeConfig.anchorDisplay !== false && this.headers.length > 0;
  }

  /** Get scroll distance */
  private getScrollTop(): number {
    return (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  }

  protected mounted(): void {
    let lastDistance = 0;

    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });

    window.addEventListener(
      "scroll",
      throttle(() => {
        if (!this.isSidebarOpen) {
          const distance = this.getScrollTop();
          // scroll down
          if (lastDistance < distance && distance > 58) this.hideNavbar = true;
          // scroll up
          else this.hideNavbar = false;

          lastDistance = distance;
        }
      }, 300)
    );
  }

  private toggleSidebar(to: boolean): void {
    this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
    this.$emit("toggle-sidebar", this.isSidebarOpen);
  }

  // Side swipe
  private onTouchStart(event: TouchEvent): void {
    this.touchStart = {
      clientX: event.changedTouches[0].clientX,
      clientY: event.changedTouches[0].clientY,
    };
  }

  private onTouchEnd(event: TouchEvent): void {
    const dx = event.changedTouches[0].clientX - this.touchStart.clientX;
    const dy = event.changedTouches[0].clientY - this.touchStart.clientY;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40)
      if (dx > 0 && this.touchStart.clientX <= 80) this.toggleSidebar(true);
      else this.toggleSidebar(false);
  }

  private getHeader(items: SidebarItem[]): SidebarHeader[] {
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
  }
}
