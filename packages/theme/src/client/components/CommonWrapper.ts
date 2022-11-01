import { useEventListener, useThrottleFn } from "@vueuse/core";
import { usePageData, usePageFrontmatter } from "@vuepress/client";
import {
  Transition,
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  resolveComponent,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { isComponentRegistered, RenderDefault } from "vuepress-shared/client";

import PageFooter from "@theme-hope/components/PageFooter.js";
import {
  useMobile,
  useThemeLocaleData,
} from "@theme-hope/composables/index.js";
import { useSidebarItems } from "@theme-hope/modules/sidebar/composables/index.js";

import type { DefineComponent, VNode } from "vue";
import type { HopeThemePageFrontmatter } from "../../shared/index.js";

import "../styles/common.scss";

export default defineComponent({
  name: "CommonWrapper",

  props: {
    /** @description Whether enable navbar */
    navbar: {
      type: Boolean,
      default: true,
    },
    /** @description Whether enable sidebar */
    sidebar: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, { slots }) {
    const router = useRouter();
    const page = usePageData();
    const frontmatter = usePageFrontmatter<HopeThemePageFrontmatter>();
    const themeLocale = useThemeLocaleData();
    const isMobile = useMobile();

    // navbar
    const hideNavbar = ref(false);

    const enableNavbar = computed(() => {
      if (props.navbar === false) return false;

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
      if (props.sidebar === false) return false;

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
      ) {
        if (dx > 0 && touchStart.x <= 80) toggleMobileSidebar(true);
        else toggleMobileSidebar(false);
      }
    };

    const enableToc = computed(
      () =>
        frontmatter.value.toc ||
        (themeLocale.value.toc !== false && frontmatter.value.toc !== false)
    );

    /** Get scroll distance */
    const getScrollTop = (): number =>
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    // close sidebar after navigation
    let unregisterRouterHook: () => void;
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
          else hideNavbar.value = false;

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
      unregisterRouterHook = router.afterEach((): void => {
        toggleMobileSidebar(false);
      });
    });

    onBeforeUnmount(() => {
      unregisterRouterHook();
    });

    return (): VNode =>
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
                !isMobile.value && isDesktopSidebarCollapsed.value,
              "sidebar-open": isMobile.value && isMobileSidebarOpen.value,
            },
            frontmatter.value.containerClass || "",
          ],
          onTouchStart,
          onTouchEnd,
        },
        h(
          isComponentRegistered("GlobalEncrypt")
            ? <DefineComponent>resolveComponent("GlobalEncrypt")
            : RenderDefault,
          () => [
            // navbar
            enableNavbar.value
              ? h(
                  <DefineComponent>resolveComponent("Navbar"),
                  { onToggleSidebar: () => toggleMobileSidebar() },
                  {
                    leftStart: () => slots["navbarLeftStart"]?.(),
                    leftEnd: () => slots["navbarLeftEnd"]?.(),
                    centerStart: () => slots["navbarCenterStart"]?.(),
                    centerEnd: () => slots["navbarCenterEnd"]?.(),
                    rightStart: () => slots["navbarRightStart"]?.(),
                    rightEnd: () => slots["navbarRightEnd"]?.(),
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
                        isDesktopSidebarCollapsed.value ? "right" : "left",
                      ],
                    })
                  )
            ),
            // sidebar
            h(
              <DefineComponent>resolveComponent("Sidebar"),
              {},
              {
                ...(slots["sidebar"]
                  ? { default: (): VNode[] | undefined => slots["sidebar"]?.() }
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
