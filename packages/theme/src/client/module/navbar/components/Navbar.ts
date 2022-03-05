import { computed, defineComponent, h, ref } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables";
import NavbarBrand from "@theme-hope/module/navbar/components/NavbarBrand";
import NavbarLinks from "@theme-hope/module/navbar/components/NavbarLinks";
import ToggleSidebarButton from "@theme-hope/module/navbar/components/ToggleSidebarButton";
import NavActions from "@theme-hope/module/navbar/components/NavActions";
import NavScreen from "@theme-hope/module/navbar/components/NavScreen";

import type { VNode } from "vue";

import "../styles/navbar.scss";

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

    return (): VNode[] => [
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
          ref: navbar,
        },
        [
          h(ToggleSidebarButton, {
            onToggle: () => {
              if (showScreen.value) showScreen.value = false;
              emit("toggle-sidebar");
            },
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
        {
          active: showScreen.value,
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
  },
});
