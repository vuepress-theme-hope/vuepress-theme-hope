import type { Slot } from "@vuepress/helper/client";
import { RenderDefault, hasGlobalComponent } from "@vuepress/helper/client";
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
  shallowRef,
  watch,
} from "vue";
import { onContentUpdated } from "vuepress/client";

import PageFooter from "@theme-hope/components/base/PageFooter";
import Navbar from "@theme-hope/components/navbar/Navbar";
import Sidebar from "@theme-hope/components/sidebar/Sidebar";
import { useSidebarItems } from "@theme-hope/composables/sidebar/useSidebarItems";
import { useData } from "@theme-hope/composables/useData";
import { usePure } from "@theme-hope/composables/usePure";
import { useWindowSize } from "@theme-hope/composables/useWindowSize";
import type { SidebarItemsSlotData } from "@theme-hope/typings/slots";

import type {
  ThemeNormalPageFrontmatter,
  ThemeProjectHomePageFrontmatter,
} from "../../../shared/index.js";

import "@vuepress/helper/transition/fade-in.css";
import "../../styles/base/main-layout.scss";

export default defineComponent({
  name: "MainLayout",

  props: {
    /**
     * Extra class of container
     *
     * 容器额外类名
     */
    containerClass: String,

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
    default: Slot;

    // Nav Screen
    navScreenTop?: Slot;
    navScreenBottom?: Slot;

    // Sidebar
    sidebarItems?: Slot<SidebarItemsSlotData>;
    sidebarTop?: Slot;
    sidebarBottom?: Slot;
  }>,

  setup(props, { slots }) {
    const { frontmatter, theme, themeLocale } = useData<
      ThemeProjectHomePageFrontmatter | ThemeNormalPageFrontmatter
    >();
    const { isMobile, isPC } = useWindowSize();
    const isPure = usePure();

    const [isMobileSidebarOpen, toggleMobileSidebar] = useToggle(false);
    const [isDesktopSidebarCollapsed, toggleDesktopSidebar] = useToggle(false);

    const sidebarItems = useSidebarItems();

    const body = shallowRef<HTMLElement>();
    const isLocked = useScrollLock(body);

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

    // external-link-icon
    const enableExternalLinkIcon = computed(
      () =>
        frontmatter.value.externalLinkIcon ??
        theme.value.externalLinkIcon ??
        true,
    );

    const enableToc = computed(
      () =>
        !props.noToc &&
        !frontmatter.value.home &&
        Boolean(frontmatter.value.toc ?? themeLocale.value.toc ?? true),
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

    watch(isMobileSidebarOpen, (value) => {
      isLocked.value = value;
    });

    onContentUpdated(() => {
      toggleMobileSidebar(false);
    });

    onMounted(() => {
      body.value = document.body;
    });

    onUnmounted(() => {
      isLocked.value = false;
    });

    return (): VNode => {
      const sidebarTopContent = slots.sidebarTop?.();
      const sidebarItemsContent = slots.sidebarItems?.(sidebarItems.value);
      const sidebarBottomContent = slots.sidebarBottom?.();

      const noSidebar =
        // sidebar is disabled via props
        props.noSidebar ||
        // sidebar is disabled via frontmatter
        frontmatter.value.sidebar === false ||
        // (is home page / no sidebar items) && no contents in sidebar slots
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        ((frontmatter.value.home || sidebarItems.value.length === 0) &&
          !sidebarTopContent &&
          !sidebarItemsContent &&
          !sidebarBottomContent);

      return h(
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
                  "no-sidebar": noSidebar,

                  // external-link-icon
                  "external-link-icon": enableExternalLinkIcon.value,

                  // pure
                  pure: isPure.value,

                  // toc
                  "has-toc": enableToc.value,
                },
                props.containerClass ?? "",
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
                    slots,
                  )
                : null,
              // Sidebar mask
              h(Transition, { name: "fade-in" }, () =>
                isMobileSidebarOpen.value
                  ? h("div", {
                      class: "vp-sidebar-mask",
                      onClick: () => toggleMobileSidebar(false),
                    })
                  : null,
              ),
              // Toggle sidebar button
              h(Transition, { name: "fade-in" }, () =>
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
              h(Sidebar, {}, slots),
              slots.default(),
              h(PageFooter),
            ],
          ),
      );
    };
  },
});
