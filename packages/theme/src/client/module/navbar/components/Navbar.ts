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
import NavScreen from "@theme-hope/module/navbar/components/NavScreen";

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
    const themeLocale = useThemeLocaleData();

    const isMobile = ref(false);
    const showScreen = ref(false);

    const navbar = ref<HTMLElement>();
    const siteBrand = ref<HTMLElement>();

    const linksWrapperMaxWidth = ref(0);
    const linksWrapperStyle = computed(() => {
      if (!linksWrapperMaxWidth.value) return {};

      return {
        "max-width": `${linksWrapperMaxWidth.value}px`,
      };
    });

    const autoHide = computed(() => {
      const { navbarAutoHide } = themeLocale.value;

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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        getCssValue(navbar.value!, "paddingLeft") +
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        getCssValue(navbar.value!, "paddingRight");

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

    return (): VNode[] => [
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
          h(NavbarBrand, { ref: siteBrand }, () => slots.left?.()),
          h(NavbarLinks, {
            style: linksWrapperStyle.value,
          }),
          h(
            NavActions,
            {
              showScreen: showScreen.value,
              onToggleScreen: () => {
                showScreen.value = !showScreen.value;
              },
            },
            {
              before: () => slots.center?.(),
              after: () => slots.right?.(),
            }
          ),
        ]
      ),
      h(
        NavScreen,
        { active: showScreen.value },
        {
          before: () => slots.screenTop?.(),
          after: () => slots.screenBottom?.(),
        }
      ),
    ];
  },
});
