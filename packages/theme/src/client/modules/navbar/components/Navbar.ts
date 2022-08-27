import { computed, defineComponent, h, ref, resolveComponent } from "vue";
import { isComponentRegistered } from "vuepress-shared/client";

import {
  useMobile,
  useThemeLocaleData,
} from "@theme-hope/composables/index.js";
import LanguageDropdown from "@theme-hope/modules/navbar/components/LanguageDropdown.js";
import NavbarBrand from "@theme-hope/modules/navbar/components/NavbarBrand.js";
import NavbarLinks from "@theme-hope/modules/navbar/components/NavbarLinks.js";
import NavScreen from "@theme-hope/modules/navbar/components/NavScreen.js";
import OutlookButton from "@theme-hope/modules/outlook/components/OutlookButton.js";
import ToggleNavbarButton from "@theme-hope/modules/navbar/components/ToggleNavbarButton.js";
import ToggleSidebarButton from "@theme-hope/modules/navbar/components/ToggleSidebarButton.js";
import RepoLink from "@theme-hope/modules/navbar/components/RepoLink.js";

import type { VNode } from "vue";
import type {
  HopeThemeNavbarComponent,
  HopeThemeNavbarLocaleOptions,
} from "../../../../shared/index.js";

import "../styles/navbar.scss";

export default defineComponent({
  name: "NavBar",

  emits: ["toggle-sidebar"],

  setup(_props, { emit, slots }) {
    const themeLocale = useThemeLocaleData();

    const isMobile = useMobile();
    const showScreen = ref(false);

    const autoHide = computed(() => {
      const { navbarAutoHide } = themeLocale.value;

      return (
        navbarAutoHide !== "none" &&
        (navbarAutoHide === "always" || isMobile.value)
      );
    });

    const navbarLayout = computed<
      Exclude<HopeThemeNavbarLocaleOptions["navbarLayout"], undefined>
    >(
      () =>
        themeLocale.value.navbarLayout || {
          left: ["Brand"],
          center: ["Links"],
          right: ["Language", "Repo", "Outlook", "Search"],
        }
    );

    return (): VNode[] => {
      const map: Record<HopeThemeNavbarComponent, VNode | null> = {
        Brand: h(NavbarBrand),
        Language: h(LanguageDropdown),
        Links: h(NavbarLinks),
        Repo: h(RepoLink),
        Outlook: h(OutlookButton),
        Search: isComponentRegistered("Docsearch")
          ? h(resolveComponent("Docsearch"))
          : isComponentRegistered("SearchBox")
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
                "hide-icon": !themeLocale.value.navbarIcon,
              },
            ],
          },
          [
            h("div", { class: "navbar-left" }, [
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              h(ToggleSidebarButton, {
                onToggle: () => {
                  if (showScreen.value) showScreen.value = false;
                  emit("toggle-sidebar");
                },
              }),
              slots["left-start"]?.(),
              ...navbarLayout.value.left.map((item) => map[item]),
              slots["left-end"]?.(),
            ]),

            h("div", { class: "navbar-center" }, [
              slots["center-start"]?.(),
              ...navbarLayout.value.center.map((item) => map[item]),
              slots["center-end"]?.(),
            ]),

            h("div", { class: "navbar-right" }, [
              slots["right-start"]?.(),
              ...navbarLayout.value.right.map((item) => map[item]),
              slots["right-start"]?.(),

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
            active: showScreen.value,
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
