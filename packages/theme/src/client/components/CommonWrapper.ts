import { hasGlobalComponent } from "@vuepress/helper/client";
import {
  useEventListener,
  useScrollLock,
  useThrottleFn,
  useToggle,
} from "@vueuse/core";
import type { ComponentOptions, SlotsType, VNode } from "vue";
import {
  Transition,
  computed,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
  resolveComponent,
  watch,
} from "vue";
import { usePageFrontmatter, useRouter } from "vuepress/client";
import { RenderDefault } from "vuepress-shared/client";

import PageFooter from "@theme-hope/components/PageFooter";
import {
  usePure,
  useThemeData,
  useThemeLocaleData,
  useWindowSize,
} from "@theme-hope/composables/index";
import Navbar from "@theme-hope/modules/navbar/components/Navbar";
import Sidebar from "@theme-hope/modules/sidebar/components/Sidebar";
import { useSidebarItems } from "@theme-hope/modules/sidebar/composables/index";

import type {
  ThemeNormalPageFrontmatter,
  ThemeProjectHomePageFrontmatter,
} from "../../shared/index.js";

import "../styles/common-wrapper.scss";

export default defineComponent({
  name: "CommonWrapper",

  props: {
    /**
     * Extra class of container
     *
     * 容器额外类名
     */
    containerClass: { type: String, default: "" },

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

    /**
     * Whether disable toc
     */
    noToc: Boolean,
  },

  slots: Object as SlotsType<{
    default: () => VNode[] | VNode | null;

    // Navbar
    navbarStartBefore?: () => VNode[] | VNode | null;
    navbarStartAfter?: () => VNode[] | VNode | null;
    navbarCenterBefore?: () => VNode[] | VNode | null;
    navbarCenterAfter?: () => VNode[] | VNode | null;
    navbarEndBefore?: () => VNode[] | VNode | null;
    navbarEndAfter?: () => VNode[] | VNode | null;
    navScreenTop?: () => VNode[] | VNode | null;
    navScreenBottom?: () => VNode[] | VNode | null;

    // Sidebar
    sidebar?: () => VNode[] | VNode;
    sidebarTop?: () => VNode[] | VNode | null;
    sidebarBottom?: () => VNode[] | VNode | null;
  }>,

  setup(props, { slots }) {
    const router = useRouter();
    const frontmatter = usePageFrontmatter<
      ThemeProjectHomePageFrontmatter | ThemeNormalPageFrontmatter
    >();
    const themeData = useThemeData();
    const themeLocale = useThemeLocaleData();
    const { isMobile, isPC } = useWindowSize();
    const isPure = usePure();

    const [isMobileSidebarOpen, toggleMobileSidebar] = useToggle(false);
    const [isDesktopSidebarCollapsed, toggleDesktopSidebar] = useToggle(false);

    const sidebarItems = useSidebarItems();

    // Navbar
    const hideNavbar = ref(false);

    const enableNavbar = computed(() => {
      if (props.noNavbar) return false;

      if (
        frontmatter.value.navbar === false ||
        themeLocale.value.navbar === false
      )
        return false;

      return Boolean(
        themeLocale.value.logo ??
          themeLocale.value.repo ??
          themeLocale.value.navbar,
      );
    });

    const enableSidebar = computed(() => {
      if (props.noSidebar) return false;

      return (
        frontmatter.value.sidebar !== false &&
        sidebarItems.value.length !== 0 &&
        !frontmatter.value.home
      );
    });

    // external-link-icon
    const enableExternalLinkIcon = computed(
      () =>
        frontmatter.value.externalLinkIcon ??
        themeData.value.externalLinkIcon ??
        true,
    );

    const enableToc = computed(
      () =>
        !props.noToc &&
        !frontmatter.value.home &&
        (frontmatter.value.toc ?? themeLocale.value.toc ?? true),
    );

    const touchStart = { x: 0, y: 0 };
    const onTouchStart = (e: TouchEvent): void => {
      touchStart.x = e.changedTouches[0].clientX;
      touchStart.y = e.changedTouches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent): void => {
      const dx = e.changedTouches[0].clientX - touchStart.x;
      const dy = e.changedTouches[0].clientY - touchStart.y;

      if (
        // Horizontal swipe
        Math.abs(dx) > Math.abs(dy) * 1.5 &&
        Math.abs(dx) > 40
      )
        if (dx > 0 && touchStart.x <= 80) toggleMobileSidebar(true);
        else toggleMobileSidebar(false);
    };

    // Close sidebar after navigation
    let lastDistance = 0;

    useEventListener(
      "scroll",
      useThrottleFn(
        () => {
          const distance = window.scrollY;

          // At top or scroll up
          if (distance <= 58 || distance < lastDistance)
            hideNavbar.value = false;
          // Scroll down > 200px and sidebar is not opened
          else if (lastDistance + 200 < distance && !isMobileSidebarOpen.value)
            hideNavbar.value = true;

          lastDistance = distance;
        },
        300,
        true,
      ),
    );

    watch(isMobile, (value) => {
      if (!value) toggleMobileSidebar(false);
    });

    onMounted(() => {
      const isLocked = useScrollLock(document.body);

      watch(isMobileSidebarOpen, (value) => {
        isLocked.value = value;
      });

      const unregisterRouterHook = router.afterEach((): void => {
        toggleMobileSidebar(false);
      });

      onUnmounted(() => {
        isLocked.value = false;
        unregisterRouterHook();
      });
    });

    return (): VNode =>
      h(
        hasGlobalComponent("GlobalEncrypt")
          ? (resolveComponent("GlobalEncrypt") as ComponentOptions)
          : RenderDefault,
        () =>
          h(
            "div",
            {
              class: [
                "theme-container",
                // Classes
                {
                  // navbar
                  "hide-navbar": hideNavbar.value,
                  "no-navbar": !enableNavbar.value,

                  // sidebar
                  "sidebar-collapsed":
                    !isMobile.value &&
                    !isPC.value &&
                    isDesktopSidebarCollapsed.value,
                  "sidebar-open": isMobile.value && isMobileSidebarOpen.value,
                  "no-sidebar":
                    !enableSidebar.value &&
                    !slots.sidebar &&
                    !slots.sidebarTop &&
                    !slots.sidebarBottom,

                  // external-link-icon
                  "external-link-icon": enableExternalLinkIcon.value,

                  // pure
                  pure: isPure.value,

                  // toc
                  "has-toc": enableToc.value,
                },
                props.containerClass,
                frontmatter.value.containerClass ?? "",
              ],
              "vp-container": "",
              onTouchStart,
              onTouchEnd,
            },
            [
              // Navbar
              enableNavbar.value
                ? h(
                    Navbar,
                    { onToggleSidebar: () => toggleMobileSidebar() },
                    {
                      startBefore: slots.navbarStartBefore,
                      startAfter: slots.navbarStartAfter,
                      centerBefore: slots.navbarCenterBefore,
                      centerAfter: slots.navbarCenterAfter,
                      endBefore: slots.navbarEndBefore,
                      endAfter: slots.navbarEndAfter,
                      screenTop: slots.navScreenTop,
                      screenBottom: slots.navScreenBottom,
                    },
                  )
                : null,
              // Sidebar mask
              h(Transition, { name: "fade" }, () =>
                isMobileSidebarOpen.value
                  ? h("div", {
                      class: "vp-sidebar-mask",
                      onClick: () => toggleMobileSidebar(false),
                    })
                  : null,
              ),
              // Toggle sidebar button
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
                      }),
                    ),
              ),
              // Sidebar
              h(
                Sidebar,
                {},
                {
                  default: slots.sidebar,
                  top: slots.sidebarTop,
                  bottom: slots.sidebarBottom,
                },
              ),
              slots.default(),
              h(PageFooter),
            ],
          ),
      );
  },
});
