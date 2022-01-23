import {
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  resolveComponent,
} from "vue";
import { useNavbarLocaleData, useThemeLocaleData } from "../../composables";
import LanguageDropdown from "./LanguageDropdown";
import NavbarBrand from "./NavbarBrand";
import NavbarLinks from "./NavbarLinks";
import ToggleDarkModeButton from "./ToggleDarkModeButton.vue";
import ToggleSidebarButton from "./ToggleSidebarButton";
import RepoLink from "../RepoLink";

import type { VNode } from "vue";

import "./styles/index.scss";

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
    const navbarLocale = useNavbarLocaleData();

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
      const autoHide = navbarLocale.value.autoHide;

      return autoHide !== "none" && (autoHide === "always" || isMobile.value);
    });

    const enableDarkmode = computed(
      () => themeLocale.value.darkmode !== "disable"
    );

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
          h("div", { class: "actions-wrapper" }, [
            h("div", { class: ["nav-item"] }, h(LanguageDropdown)),
            h("div", { class: ["nav-item", "hide-in-mobile"] }, h(RepoLink)),
            slots.center?.(),
            enableDarkmode.value ? h(ToggleDarkModeButton) : null,
            h(resolveComponent("NavbarSearch")),
            slots.after?.(),
          ]),
        ]
      );
  },
});
