import {
  type Component,
  type ComponentOptions,
  type FunctionalComponent,
  type SlotsType,
  type VNode,
  computed,
  defineComponent,
  h,
  ref,
  resolveComponent,
} from "vue";
import { hasGlobalComponent } from "vuepress-shared/client";
import noopModule from "vuepress-shared/noopModule";

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

import {
  type NavbarComponent,
  type NavbarLayoutOptions,
} from "../../../../shared/index.js";

import "../styles/navbar.scss";

declare const HAS_MULTIPLE_LANGUAGES: boolean;

export default defineComponent({
  name: "NavBar",

  emits: ["toggleSidebar"],

  slots: Object as SlotsType<{
    default: () => VNode | VNode[];

    // navbar
    startBefore?: () => VNode | VNode[];
    startAfter?: () => VNode | VNode[];
    centerBefore?: () => VNode | VNode[];
    centerAfter?: () => VNode | VNode[];
    endBefore?: () => VNode | VNode[];
    endAfter?: () => VNode | VNode[];
    screenTop?: () => VNode | VNode[];
    screenBottom?: () => VNode | VNode[];
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
        themeLocale.value.navbarLayout ||
        <NavbarLayoutOptions>{
          start: ["Brand"],
          center: ["Links"],
          end: ["Language", "Repo", "Outlook", "Search"],
        }
    );

    const navbarComponentMap: Record<
      NavbarComponent | string,
      Component | string
    > = {
      Brand: NavbarBrand,
      Language: HAS_MULTIPLE_LANGUAGES ? LanguageDropdown : noopModule,
      Links: NavbarLinks,
      Repo: RepoLink,
      Outlook: OutlookButton,
      Search: hasGlobalComponent("Docsearch")
        ? resolveComponent("Docsearch")
        : hasGlobalComponent("SearchBox")
        ? resolveComponent("SearchBox")
        : noopModule,
    };

    const getNavbarComponent = (
      component: NavbarComponent | string
    ): Component | string =>
      navbarComponentMap[component] ??
      (hasGlobalComponent(component)
        ? resolveComponent(component)
        : noopModule);

    return (): VNode[] => {
      return [
        h(
          "header",
          {
            class: [
              "navbar",
              {
                "auto-hide": autoHide.value,
                "hide-icon": themeLocale.value.navbarIcon === false,
              },
            ],
            id: "navbar",
          },
          [
            h("div", { class: "navbar-start" }, [
              h(ToggleSidebarButton, {
                onToggle: () => {
                  if (showScreen.value) showScreen.value = false;
                  emit("toggleSidebar");
                },
              }),
              slots.startBefore?.(),
              (navbarLayout.value.start || []).map((item) =>
                h(
                  <ComponentOptions | FunctionalComponent>(
                    getNavbarComponent(item)
                  )
                )
              ),
              slots.startAfter?.(),
            ]),

            h("div", { class: "navbar-center" }, [
              slots.centerBefore?.(),
              (navbarLayout.value.center || []).map((item) =>
                h(
                  <ComponentOptions | FunctionalComponent>(
                    getNavbarComponent(item)
                  )
                )
              ),
              slots.centerAfter?.(),
            ]),

            h("div", { class: "navbar-end" }, [
              slots.endBefore?.(),
              (navbarLayout.value.end || []).map((item) =>
                h(
                  <ComponentOptions | FunctionalComponent>(
                    getNavbarComponent(item)
                  )
                )
              ),
              slots.endAfter?.(),

              h(ToggleNavbarButton, {
                active: showScreen.value,
                onToggle: () => {
                  showScreen.value = !showScreen.value;
                },
              }),
            ]),
          ]
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
            before: () => slots.screenTop?.(),
            after: () => slots.screenBottom?.(),
          }
        ),
      ];
    };
  },
});
