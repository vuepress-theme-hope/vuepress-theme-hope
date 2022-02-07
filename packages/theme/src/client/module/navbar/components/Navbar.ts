import {
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";

import { useThemeLocaleData } from "@theme-hope/composables";
import NavbarBrand from "@theme-hope/module/navbar/components/NavbarBrand";
import NavbarLinks from "@theme-hope/module/navbar/components/NavbarLinks";
import ToggleSidebarButton from "@theme-hope/module/navbar/components/ToggleSidebarButton";
import NavActions from "@theme-hope/module/navbar/components/NavActions";

import type { VNode } from "vue";

import "../styles/navbar.scss";

const getCssValue = (
  el: Element | null,
  property: keyof Omit<
    CSSStyleDeclaration,
    | "getPropertyPriority"
    | "getPropertyValue"
    | "item"
    | "removeProperty"
    | "setProperty"
    | number
  >
): number => {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const value = el?.ownerDocument.defaultView?.getComputedStyle(el, null)[
    property
  ] as string;

  const num = Number.parseInt(value, 10);
  return Number.isNaN(num) ? 0 : num;
};

export default defineComponent({
  name: "NavBar",

  emits: ["toggle-sidebar"],

  setup(_props, { emit, slots }) {
    const themeLocaleData = useThemeLocaleData();

    const isMobile = ref(false);

    const navbar = ref<HTMLElement | null>(null);
    const siteBrand = ref<HTMLElement | null>(null);

    const linksWrapperMaxWidth = ref(0);
    const linksWrapperStyle = computed(() => {
      if (!linksWrapperMaxWidth.value) return {};

      return {
        "max-width": `${linksWrapperMaxWidth.value}px`,
      };
    });

    const autoHide = computed(() => {
      const { navbarAutoHide } = themeLocaleData.value;

      return (
        navbarAutoHide !== "none" &&
        (navbarAutoHide === "always" || isMobile.value)
      );
    });

    let handleLinksWrapWidth: () => void;

    // avoid overlapping of long title and long navbar links
    onMounted(() => {
      // TODO: migrate to css var
      // refer to _variables.scss
      const MOBILE_DESKTOP_BREAKPOINT = 719;
      const navbarHorizontalPadding =
        getCssValue(navbar.value, "paddingLeft") +
        getCssValue(navbar.value, "paddingRight");

      handleLinksWrapWidth = (): void => {
        if (window.innerWidth < MOBILE_DESKTOP_BREAKPOINT) {
          isMobile.value = true;
          linksWrapperMaxWidth.value = 0;
        } else {
          isMobile.value = false;
          linksWrapperMaxWidth.value =
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            navbar.value!.offsetWidth -
            navbarHorizontalPadding -
            (siteBrand.value?.offsetWidth || 0);
        }
      };

      handleLinksWrapWidth();
      window.addEventListener("resize", handleLinksWrapWidth, false);
      window.addEventListener("orientationchange", handleLinksWrapWidth, false);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleLinksWrapWidth, false);
      window.removeEventListener(
        "orientationchange",
        handleLinksWrapWidth,
        false
      );
    });

    return (): VNode =>
      h(
        "header",
        {
          class: ["navbar", { "auto-hide": autoHide.value }],
          ref: navbar,
        },
        [
          h(ToggleSidebarButton, {
            onToggle: () => emit("toggle-sidebar"),
          }),
          h(NavbarBrand, { ref: siteBrand }, { default: slots.before?.() }),
          h(NavbarLinks, {
            style: linksWrapperStyle.value,
          }),
          h(NavActions),
        ]
      );
  },
});
