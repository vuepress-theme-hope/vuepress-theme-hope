<template>
  <div
    :class="pageClasses"
    class="theme-container"
    @touchend="onTouchEnd"
    @touchstart="onTouchStart"
  >
    <!-- 密码弹窗 -->
    <Password v-if="globalEncrypted" @enter="globalPasswordCheck" />
    <!-- 内容 -->
    <template v-else>
      <Navbar v-if="showNavbar" @toggle-sidebar="toggleSidebar" />

      <div class="sidebar-mask" @click="toggleSidebar(false)" />

      <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
        <template #top>
          <slot name="sidebar-top" />
        </template>
        <template #center>
          <slot name="sidebar-center" />
        </template>
        <template #bottom>
          <slot name="sidebar-bottom" />
        </template>
      </Sidebar>

      <slot :sidebar-items="sidebarItems" :headers="headers" />
    </template>
  </div>
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import {
  SidebarItem,
  SidebarGroupItem,
  SidebarHeader,
  resolveSidebarItems,
} from "../util/sidebar";
import GlobalEncryptMixin from "../util/globalEncryptMixin";
import Navbar from "@theme/components/Navbar.vue";
import Password from "@theme/components/Password.vue";
import { PageHeader } from "@mr-hope/vuepress-types";
import Sidebar from "@theme/components/Sidebar.vue";

@Component({ components: { Password, Sidebar, Navbar } })
export default class Common extends Mixins(GlobalEncryptMixin) {
  @Prop({ type: Boolean, default: true })
  private readonly navbar!: boolean;

  @Prop({ type: Boolean, default: true })
  private readonly sidebar!: boolean;

  private isSidebarOpen = false;

  private touchStart: { clientX: number; clientY: number } = {
    clientX: 0,
    clientY: 0,
  };

  /** 是否应该展示导航栏 */
  private get showNavbar(): boolean {
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

  /** 是否应该展示侧边栏 */
  private get showSidebar(): boolean {
    if (this.sidebar === false) return false;

    return (
      !this.$frontmatter.home &&
      this.$frontmatter.sidebar !== false &&
      this.sidebarItems.length !== 0
    );
  }

  /** 侧边栏内容 */
  private get sidebarItems(): SidebarItem[] {
    if (this.sidebar === false) return [];

    return resolveSidebarItems(this.$page, this.$site, this.$localePath);
  }

  /** 页面 Class */
  private get pageClasses(): any {
    const userPageClass = this.$page.frontmatter.pageClass;

    return [
      {
        "no-navbar": !this.showNavbar,
        "sidebar-open": this.isSidebarOpen,
        "no-sidebar": !this.showSidebar,
        "has-anchor": this.showAnchor,
      },
      userPageClass,
    ];
  }

  private get headers() {
    return this.getHeader(this.sidebarItems);
  }

  private get showAnchor() {
    return this.$themeConfig.anchorDisplay !== false && this.headers.length > 0;
  }

  protected mounted(): void {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  }

  private toggleSidebar(to: any): void {
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
          (item as SidebarGroupItem).children
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
</script>

<style lang="stylus">
.sidebar-mask
  position fixed
  z-index 9
  top 0
  left 0
  width 100vw
  height 100vh
  display none

  .theme-container.sidebar-open &
    display block
</style>
