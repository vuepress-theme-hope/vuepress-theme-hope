import { computed, defineComponent, h, ref, resolveComponent } from "vue";
import { hasGlobalComponent } from "vuepress-shared/client";

import {
  useThemeLocaleData,
  useWindowSize,
} from "@theme-hope/composables/index";
import LanguageDropdown from "@theme-hope/modules/navbar/components/LanguageDropdown";
import NavbarBrand from "@theme-hope/modules/navbar/components/NavbarBrand";
import NavbarLinks from "@theme-hope/modules/navbar/components/NavbarLinks";
import NavScreen from "@theme-hope/modules/navbar/components/NavScreen";
import OutlookButton from "@theme-hope/modules/outlook/components/OutlookButton";
import ToggleNavbarButton from "@theme-hope/modules/navbar/components/ToggleNavbarButton";
import ToggleSidebarButton from "@theme-hope/modules/navbar/components/ToggleSidebarButton";
import RepoLink from "@theme-hope/modules/navbar/components/RepoLink";

import type { VNode } from "vue";
import type {
  NavbarComponent,
  NavbarLocaleOptions,
} from "../../../../shared/index.js";

import "../styles/navbar.scss";

declare const HAS_MULTIPLE_LANGUAGES: boolean;

export default defineComponent({
  name: "NavBar",

  emits: {
    toggleSidebar: () => true,
  },

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

    const navbarLayout = computed<
      Exclude<NavbarLocaleOptions["navbarLayout"], undefined>
    >(
      () =>
        themeLocale.value.navbarLayout || {
          left: ["Brand"],
          center: ["Links"],
          right: ["Language", "Repo", "Outlook", "Search"],
        }
    );

    return (): VNode[] => {
      const map: Record<NavbarComponent, VNode | null> = {
        Brand: h(NavbarBrand),
        Language: HAS_MULTIPLE_LANGUAGES ? h(LanguageDropdown) : null,
        Links: h(NavbarLinks),
        Repo: h(RepoLink),
        Outlook: h(OutlookButton),
        Search: hasGlobalComponent("Docsearch")
          ? h(resolveComponent("Docsearch"))
          : hasGlobalComponent("SearchBox")
          ? h(resolveComponent("SearchBox"))
          : hasGlobalComponent("SearchBox")
          ? h(resolveComponent("SearchBox"))
          : null,
      };

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
            h("div", { class: "navbar-left" }, [
              // @ts-ignore
              h(ToggleSidebarButton, {
                onToggle: () => {
                  if (showScreen.value) showScreen.value = false;
                  emit("toggleSidebar");
                },
              }),
              slots["leftStart"]?.(),
              ...navbarLayout.value.left.map((item) => map[item]),
              slots["leftEnd"]?.(),
            ]),

            h("div", { class: "navbar-center" }, [
              slots["centerStart"]?.(),
              ...navbarLayout.value.center.map((item) => map[item]),
              slots["centerEnd"]?.(),
            ]),

            h("div", { class: "navbar-right" }, [
              slots["rightStart"]?.(),
              ...navbarLayout.value.right.map((item) => map[item]),
              slots["rightEnd"]?.(),

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
            before: () => slots["screenTop"]?.(),
            after: () => slots["screenBottom"]?.(),
          }
        ),
      ];
    };
  },
});
