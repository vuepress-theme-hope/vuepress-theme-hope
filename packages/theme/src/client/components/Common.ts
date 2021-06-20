import throttle from "lodash.throttle";
import { computed, defineComponent, h, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { usePageData, usePageFrontmatter } from "@vuepress/client";
import Navbar from "@Navbar";
import Sidebar from "@Sidebar";
import PageFooter from "./PageFooter";
import { useSidebarItems, useThemeLocaleData } from "../composables";

import type { VNode } from "vue";
import type { HopeThemePageFrontmatter } from "../../shared";

export default defineComponent({
  name: "Common",

  props: {
    navbar: {
      type: Boolean,
      default: true,
    },
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

    // navbar
    const hideNavbar = ref(false);

    const enableNavbar = computed(() => {
      if (props.navbar === false) return false;

      if (
        frontmatter.value.navbar === false ||
        themeLocale.value.navbar == false
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

    const enableSidedbar = computed(() => {
      if (props.sidebar === false) return false;

      return (
        !frontmatter.value.home &&
        frontmatter.value.sidebar !== false &&
        sidebarItems.value.length !== 0
      );
    });

    const isSidebarOpen = ref(false);
    const toggleSidebar = (to?: boolean): void => {
      isSidebarOpen.value = typeof to === "boolean" ? to : !isSidebarOpen.value;
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
        if (dx > 0 && touchStart.x <= 80) toggleSidebar(true);
        else toggleSidebar(false);
      }
    };

    const enableAnchor = computed(
      () =>
        frontmatter.value.anchorDisplay ||
        (themeLocale.value.anchorDisplay !== false &&
          frontmatter.value.anchorDisplay !== false)
    );

    // classes
    const containerClass = computed(() => [
      "theme-container",
      {
        "no-navbar": !enableNavbar.value,
        "no-sidebar": !enableSidedbar.value,
        "has-anchor": enableAnchor.value,
        "hide-navbar": hideNavbar.value,
        "sidebar-open": isSidebarOpen.value,
      },
      frontmatter.value.pageClass,
    ]);

    /** Get scroll distance */
    const getScrollTop = (): number =>
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    // close sidebar after navigation
    let unregisterRouterHook: () => void;
    let lastDistance = 0;

    const scrollHandler = throttle(() => {
      const distance = getScrollTop();

      // scroll down
      if (lastDistance < distance && distance > 58) {
        if (!isSidebarOpen.value) hideNavbar.value = true;
        // scroll up
      } else hideNavbar.value = false;

      lastDistance = distance;
    }, 300);

    onMounted(() => {
      unregisterRouterHook = router.afterEach(() => {
        toggleSidebar(false);
      });

      window.addEventListener("scroll", scrollHandler);
    });
    onUnmounted(() => {
      unregisterRouterHook();
      window.removeEventListener("scroll", scrollHandler);
    });

    return (): VNode =>
      h(
        "div",
        {
          class: containerClass.value,
          onTouchStart,
          onTouchEnd,
        },
        [
          enableNavbar.value
            ? h(Navbar, { onToggleSidebar: () => toggleSidebar() })
            : null,
          h("div", {
            class: "sidebar-mask",
            onClick: () => toggleSidebar(false),
          }),
          h(Sidebar),
          slots.default?.(),
          h(PageFooter),
        ]
      );
  },
});
