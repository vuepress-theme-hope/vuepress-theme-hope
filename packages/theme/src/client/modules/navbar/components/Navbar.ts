import { hasGlobalComponent } from "@vuepress/helper/client";
import noopComponent from "@vuepress/helper/noopComponent";
import type {
  Component,
  ComponentOptions,
  FunctionalComponent,
  SlotsType,
  VNode,
} from "vue";
import { computed, defineComponent, h, ref, resolveComponent } from "vue";

import {
  useThemeLocaleData,
  useWindowSize,
} from "@theme-hope/composables/index";
import LanguageDropdown from "@theme-hope/modules/navbar/components/LanguageDropdown";
import NavScreen from "@theme-hope/modules/navbar/components/NavScreen";
import NavbarBrand from "@theme-hope/modules/navbar/components/NavbarBrand";
import NavbarLinks from "@theme-hope/modules/navbar/components/NavbarLinks";
import RepoLink from "@theme-hope/modules/navbar/components/RepoLink";
import ToggleNavbarButton from "@theme-hope/modules/navbar/components/ToggleNavbarButton";
import ToggleSidebarButton from "@theme-hope/modules/navbar/components/ToggleSidebarButton";
import OutlookButton from "@theme-hope/modules/outlook/components/OutlookButton";

import type { NavbarLayoutOptions } from "../../../../shared/index.js";

import "../styles/navbar.scss";

declare const __VP_MULTI_LANGUAGES__: boolean;

export default defineComponent({
  name: "NavBar",

  emits: ["toggleSidebar"],

  slots: Object as SlotsType<{
    default: () => VNode[] | VNode | null;

    // Navbar
    startBefore?: () => VNode[] | VNode | null;
    startAfter?: () => VNode[] | VNode | null;
    centerBefore?: () => VNode[] | VNode | null;
    centerAfter?: () => VNode[] | VNode | null;
    endBefore?: () => VNode[] | VNode | null;
    endAfter?: () => VNode[] | VNode | null;
    screenTop?: () => VNode[] | VNode | null;
    screenBottom?: () => VNode[] | VNode | null;
  }>,

  setup(_props, { emit, slots }) {
    const themeLocale = useThemeLocaleData();
    const { isMobile } = useWindowSize();

    const showScreen = ref(false);

    const autoHide = computed(() => {
      const { navbarAutoHide = "mobile" } = themeLocale.value;

      return (
        navbarAutoHide !== "none" &&
        (navbarAutoHide === "always" || isMobile.value)
      );
    });

    const navbarLayout = computed(
      () =>
        themeLocale.value.navbarLayout ??
        ({
          start: ["Brand"],
          center: ["Links"],
          end: ["Language", "Repo", "Outlook", "Search"],
        } as NavbarLayoutOptions),
    );

    const navbarComponentMap: Record<string, Component | string> = {
      Brand: NavbarBrand,
      Language: __VP_MULTI_LANGUAGES__ ? LanguageDropdown : noopComponent,
      Links: NavbarLinks,
      Repo: RepoLink,
      Outlook: OutlookButton,
      Search: hasGlobalComponent("Docsearch")
        ? resolveComponent("Docsearch")
        : hasGlobalComponent("SearchBox")
          ? resolveComponent("SearchBox")
          : noopComponent,
    };

    const getNavbarComponent = (component: string): Component | string =>
      navbarComponentMap[component] ??
      (hasGlobalComponent(component)
        ? resolveComponent(component)
        : noopComponent);

    return (): VNode[] => [
      h(
        "header",
        {
          key: "navbar",
          id: "navbar",
          class: ["vp-navbar", { "auto-hide": autoHide.value }],
        },
        [
          h("div", { class: "vp-navbar-start" }, [
            h(ToggleSidebarButton, {
              onToggle: () => {
                if (showScreen.value) showScreen.value = false;
                emit("toggleSidebar");
              },
            }),
            slots.startBefore?.(),
            navbarLayout.value.start?.map((item) =>
              h(
                getNavbarComponent(item) as
                  | ComponentOptions
                  | FunctionalComponent,
              ),
            ),
            slots.startAfter?.(),
          ]),

          h("div", { class: "vp-navbar-center" }, [
            slots.centerBefore?.(),
            navbarLayout.value.center?.map((item) =>
              h(
                getNavbarComponent(item) as
                  | ComponentOptions
                  | FunctionalComponent,
              ),
            ),
            slots.centerAfter?.(),
          ]),

          h("div", { class: "vp-navbar-end" }, [
            slots.endBefore?.(),
            navbarLayout.value.end?.map((item) =>
              h(
                getNavbarComponent(item) as
                  | ComponentOptions
                  | FunctionalComponent,
              ),
            ),
            slots.endAfter?.(),

            h(ToggleNavbarButton, {
              active: showScreen.value,
              onToggle: () => {
                showScreen.value = !showScreen.value;
              },
            }),
          ]),
        ],
      ),
      h(
        NavScreen,
        {
          show: showScreen.value,
          onClose: () => {
            showScreen.value = false;
          },
        },
        {
          before: slots.screenTop
            ? (): VNode | VNode[] | null => slots.screenTop!()
            : null,
          after: slots.screenBottom
            ? (): VNode | VNode[] | null => slots.screenBottom!()
            : null,
        },
      ),
    ];
  },
});
