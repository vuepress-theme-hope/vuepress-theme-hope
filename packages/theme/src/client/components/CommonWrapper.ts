import throttle from "lodash.throttle";
import {
  Transition,
  computed,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
  resolveComponent,
} from "vue";
import { useRouter } from "vue-router";
import { usePageData, usePageFrontmatter } from "@vuepress/client";

import PageFooter from "@theme-hope/components/PageFooter";
import PasswordModal from "@theme-hope/module/encrypt/components/PasswordModal";
import { useThemeData, useThemeLocaleData } from "@theme-hope/composables";
import { useGlobalEcrypt } from "@theme-hope/module/encrypt/composables";
import { useSidebarItems } from "@theme-hope/module/sidebar/composables";

import type { ComponentOptions, VNode } from "vue";
import type { HopeThemePageFrontmatter } from "../../shared";

import "../styles/common.scss";

export default defineComponent({
  name: "CommonWrapper",

  props: {
    navbar: {
      type: Boolean,
      default: true,
    },
    sidebar: {
      type: Boolean,
      default: true,
    },
    toggleSidebar: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { slots }) {
    const router = useRouter();
    const page = usePageData();
    const frontmatter = usePageFrontmatter<HopeThemePageFrontmatter>();
    const themeData = useThemeData();
    const themeLocale = useThemeLocaleData();
    const { isGlobalEncrypted, validateGlobalToken } = useGlobalEcrypt();

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

    const enableSidebar = computed(() => {
      if (props.sidebar === false) return false;

      return (
        frontmatter.value.sidebar !== false &&
        sidebarItems.value.length !== 0 &&
        !frontmatter.value.home
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

    const enableToc = computed(
      () =>
        frontmatter.value.toc ||
        (themeLocale.value.toc !== false && frontmatter.value.toc !== false)
    );

    // classes
    const containerClass = computed(() => [
      "theme-container",
      {
        "no-navbar": !enableNavbar.value,
        "no-sidebar": !enableSidebar.value,
        "disable-sidebar": !enableNavbar.value && !props.toggleSidebar,
        "has-toc": enableToc.value,
        "hide-navbar": hideNavbar.value,
        "sidebar-open": isSidebarOpen.value,
      },
      frontmatter.value.containerClass || "",
    ]);

    /** Get scroll distance */
    const getScrollTop = (): number =>
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const handler = (): void => {
      if (window.innerWidth > (themeData.value.mobileBreakPoint || 719))
        toggleSidebar(false);
    };

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
      unregisterRouterHook = router.afterEach((): void => {
        toggleSidebar(false);
      });

      window.addEventListener("orientationchange", handler, false);
      window.addEventListener("resize", handler, false);
      window.addEventListener("scroll", scrollHandler);
    });

    onUnmounted(() => {
      unregisterRouterHook();
      window.removeEventListener("orientationchange", handler, false);
      window.removeEventListener("resize", handler, false);
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
        isGlobalEncrypted.value
          ? h(PasswordModal, { full: true, onVerify: validateGlobalToken })
          : [
              enableNavbar.value
                ? h(
                    resolveComponent("Navbar") as ComponentOptions,
                    { onToggleSidebar: () => toggleSidebar() },
                    {
                      left: () => slots.navbarLeft?.(),
                      center: () => slots.navbarCenter?.(),
                      right: () => slots.navbarRight?.(),
                      screenTop: () => slots.navScreenTop?.(),
                      screenBottom: () => slots.navScreenBottom?.(),
                    }
                  )
                : null,
              h(Transition, { name: "fade" }, () =>
                isSidebarOpen.value
                  ? h("div", {
                      class: "sidebar-mask",
                      onClick: () => toggleSidebar(false),
                    })
                  : null
              ),
              h(
                resolveComponent("Sidebar") as ComponentOptions,
                {},
                {
                  default: slots.sidebar
                    ? (): VNode[] | undefined => slots.sidebar?.()
                    : undefined,
                  top: () => slots.sidebarTop?.(),
                  bottom: () => slots.sidebarBottom?.(),
                }
              ),
              slots.default?.(),
              h(PageFooter),
            ]
      );
  },
});
