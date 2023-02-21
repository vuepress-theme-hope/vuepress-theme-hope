import { usePageData, usePageFrontmatter } from "@vuepress/client";
import { useEventListener, useThrottleFn } from "@vueuse/core";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import {
  type ComponentPublicInstance,
  type DefineComponent,
  Transition,
  type VNode,
  computed,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
  resolveComponent,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { RenderDefault, hasGlobalComponent } from "vuepress-shared/client";

import PageFooter from "@theme-hope/components/PageFooter";
import {
  useThemeLocaleData,
  useWindowSize,
} from "@theme-hope/composables/index";
import Navbar from "@theme-hope/modules/navbar/components/Navbar";
import Sidebar from "@theme-hope/modules/sidebar/components/Sidebar";
import { useSidebarItems } from "@theme-hope/modules/sidebar/composables/index";

import {
  type ThemeNormalPageFrontmatter,
  type ThemeProjectHomePageFrontmatter,
} from "../../shared/index.js";

import "../styles/common.scss";

export default defineComponent({
  name: "CommonWrapper",

  props: {
    /**
     * Whether disable navbar
     *
     * 是否禁用导航栏
     */
    noNavbar: Boolean,

    /**
     * Whether disable sidebar
     *
     * 是否禁用侧边栏
     */
    noSidebar: Boolean,
  },

  setup(props, { slots }) {
    const router = useRouter();
    const page = usePageData();
    const frontmatter = usePageFrontmatter<
      ThemeProjectHomePageFrontmatter | ThemeNormalPageFrontmatter
    >();
    const themeLocale = useThemeLocaleData();
    const { isMobile, isWide } = useWindowSize();
    const sidebar = ref<ComponentPublicInstance>();

    // navbar
    const hideNavbar = ref(false);

    const enableNavbar = computed(() => {
      if (props.noNavbar) return false;

      if (
        frontmatter.value.navbar === false ||
        themeLocale.value.navbar === false
      )
        return false;

      return Boolean(
        page.value.title ||
          themeLocale.value.logo ||
          themeLocale.value.repo ||
          themeLocale.value.navbar
      );
    });

    // sidebar
    const sidebarItems = useSidebarItems();

    const enableSidebar = computed(() => {
      if (props.noSidebar) return false;

      return (
        frontmatter.value.sidebar !== false &&
        sidebarItems.value.length !== 0 &&
        !frontmatter.value.home
      );
    });

    const isMobileSidebarOpen = ref(false);
    const isDesktopSidebarCollapsed = ref(false);
    const toggleMobileSidebar = (value?: boolean): void => {
      isMobileSidebarOpen.value =
        typeof value === "boolean" ? value : !isMobileSidebarOpen.value;
    };
    const toggleDesktopSidebar = (value?: boolean): void => {
      isDesktopSidebarCollapsed.value =
        typeof value === "boolean" ? value : !isDesktopSidebarCollapsed.value;
    };

    const touchStart = { x: 0, y: 0 };
    const onTouchStart = (e: TouchEvent): void => {
      touchStart.x = e.changedTouches[0].clientX;
      touchStart.y = e.changedTouches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent): void => {
      const dx = e.changedTouches[0].clientX - touchStart.x;
      const dy = e.changedTouches[0].clientY - touchStart.y;

      if (
        // horizontal swipe
        Math.abs(dx) > Math.abs(dy) * 1.5 &&
        Math.abs(dx) > 40
      )
        if (dx > 0 && touchStart.x <= 80) toggleMobileSidebar(true);
        else toggleMobileSidebar(false);
    };

    const enableToc = computed(() =>
      frontmatter.value.home
        ? false
        : frontmatter.value.toc ||
          (themeLocale.value.toc !== false && frontmatter.value.toc !== false)
    );

    /** Get scroll distance */
    const getScrollTop = (): number =>
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    // close sidebar after navigation
    let lastDistance = 0;

    useEventListener(
      "scroll",
      useThrottleFn(
        () => {
          const distance = getScrollTop();

          // scroll down
          if (lastDistance < distance && distance > 58) {
            if (!isMobileSidebarOpen.value) hideNavbar.value = true;
          }
          // scroll up
          else {
            hideNavbar.value = false;
          }

          lastDistance = distance;
        },
        300,
        true
      )
    );

    watch(isMobile, (value) => {
      if (!value) toggleMobileSidebar(false);
    });

    onMounted(() => {
      const unregisterRouterHook = router.afterEach((): void => {
        toggleMobileSidebar(false);
      });

      onUnmounted(() => {
        unregisterRouterHook();
      });

      watch(isMobileSidebarOpen, (value) => {
        const sidebarElement = sidebar.value!.$el as HTMLElement;

        if (value)
          disableBodyScroll(sidebarElement, {
            reserveScrollBarGap: true,
          });
        else enableBodyScroll(sidebarElement);
      });
    });

    return (): VNode =>
      h(
        hasGlobalComponent("GlobalEncrypt")
          ? <DefineComponent>resolveComponent("GlobalEncrypt")
          : RenderDefault,
        () =>
          h(
            "div",
            {
              class: [
                "theme-container",
                // classes
                {
                  "no-navbar": !enableNavbar.value,
                  "no-sidebar":
                    !enableSidebar.value &&
                    !(
                      slots["sidebar"] ||
                      slots["sidebarTop"] ||
                      slots["sidebarBottom"]
                    ),
                  "has-toc": enableToc.value,
                  "hide-navbar": hideNavbar.value,
                  "sidebar-collapsed":
                    !isMobile.value &&
                    !isWide.value &&
                    isDesktopSidebarCollapsed.value,
                  "sidebar-open": isMobile.value && isMobileSidebarOpen.value,
                },
                frontmatter.value.containerClass || "",
              ],
              onTouchStart,
              onTouchEnd,
            },
            [
              // navbar
              enableNavbar.value
                ? h(
                    Navbar,
                    { onToggleSidebar: () => toggleMobileSidebar() },
                    {
                      startBefore: () => slots["navbarStartBefore"]?.(),
                      startAfter: () => slots["navbarStartAfter"]?.(),
                      centerBefore: () => slots["navbarCenterBefore"]?.(),
                      centerAfter: () => slots["navbarCenterAfter"]?.(),
                      endBegin: () => slots["navbarEndBegin"]?.(),
                      endAfter: () => slots["navbarEndAfter"]?.(),
                      screenTop: () => slots["navScreenTop"]?.(),
                      screenBottom: () => slots["navScreenBottom"]?.(),
                    }
                  )
                : null,
              // sidebar mask
              h(Transition, { name: "fade" }, () =>
                isMobileSidebarOpen.value
                  ? h("div", {
                      class: "sidebar-mask",
                      onClick: () => toggleMobileSidebar(false),
                    })
                  : null
              ),
              // toggle sidebar button
              h(Transition, { name: "fade" }, () =>
                isMobile.value
                  ? null
                  : h(
                      "div",
                      {
                        class: "toggle-sidebar-wrapper",
                        onClick: () => toggleDesktopSidebar(),
                      },
                      h("span", {
                        class: [
                          "arrow",
                          isDesktopSidebarCollapsed.value ? "end" : "start",
                        ],
                      })
                    )
              ),
              // sidebar
              h(
                Sidebar,
                { ref: sidebar },
                {
                  ...(slots["sidebar"]
                    ? {
                        default: (): VNode[] | undefined =>
                          slots["sidebar"]?.(),
                      }
                    : {}),
                  top: () => slots["sidebarTop"]?.(),
                  bottom: () => slots["sidebarBottom"]?.(),
                }
              ),
              slots["default"]?.(),
              h(PageFooter),
            ]
          )
      );
  },
});
