import { Component, Vue } from 'vue-property-decorator';
import { SidebarItem, resolveSidebarItems } from './sidebar';

@Component
export default class LayoutMixin extends Vue {
  protected isSidebarOpen = false;

  protected touchStart: Record<string, number> = {};

  /** 是否应该展示导航栏 */
  protected get shouldShowNavbar(): boolean {
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

  /** 是否应该展示侧边栏 */
  protected get shouldShowSidebar(): boolean {
    return (
      !this.$frontmatter.home &&
      this.$frontmatter.sidebar !== false &&
      this.sidebarItems.length !== 0
    );
  }

  /** 侧边栏内容 */
  protected get sidebarItems(): SidebarItem[] {
    return resolveSidebarItems(this.$page, this.$site, this.$localePath);
  }

  /** 页面 Class */
  protected get pageClasses(): any {
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

  protected mounted(): void {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  }

  protected toggleSidebar(to: any): void {
    this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen;
    this.$emit('toggle-sidebar', this.isSidebarOpen);
  }

  // Side swipe
  protected onTouchStart(e: TouchEvent): void {
    this.touchStart = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };
  }

  protected onTouchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.touchStart.x;
    const dy = e.changedTouches[0].clientY - this.touchStart.y;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40)
      if (dx > 0 && this.touchStart.x <= 80) this.toggleSidebar(true);
      else this.toggleSidebar(false);
  }
}
