import {
  computed,
  defineComponent,
  h,
  ref,
  resolveComponent,
  Transition,
  withDirectives,
} from "vue";
import { clickOutSideDirective } from "@mr-hope/vuepress-shared/lib/client";

import { useThemeLocaleData } from "@theme-hope/composables";
import ThemeColorPicker from "@theme-hope/module/navbar/components/ThemeColorPicker";
import ToggleDarkModeButton from "@theme-hope/module/navbar/components/ToggleDarkModeButton";
import { OutlookIcon } from "@theme-hope/module/navbar/components/icons";

import type { VNode } from "vue";

import "../styles/outlook-button.scss";

export default defineComponent({
  name: "OutlookButton",

  setup() {
    const showDropdown = ref(false);
    const FullScreen = resolveComponent("FullScreen");

    const themeLocale = useThemeLocaleData();

    const enableDarkmode = computed(
      () =>
        themeLocale.value.darkmode !== "disable" &&
        themeLocale.value.darkmode !== "force-dark"
    );

    const enableThemeColor = computed(
      () => themeLocale.value.themeColor !== false
    );

    return (): VNode =>
      withDirectives(
        h(
          "button",
          {
            class: ["outlook-button", { active: showDropdown.value }],
            tabindex: "-1",
            ariaHidden: true,
            onClick: () => {
              showDropdown.value = !showDropdown.value;
            },
          },
          [
            h(OutlookIcon),
            h(Transition, { mode: "out-in", name: "menu-transition" }, () =>
              showDropdown.value
                ? h("div", { class: "outlook-dropdown" }, [
                    enableThemeColor.value ? h(ThemeColorPicker) : null,
                    h("div", { class: "outlook-buttons" }, [
                      enableDarkmode.value ? h(ToggleDarkModeButton) : null,
                      FullScreen ? h(FullScreen) : null,
                    ]),
                  ])
                : null
            ),
          ]
        ),
        [
          [
            clickOutSideDirective,
            (): void => {
              showDropdown.value = false;
            },
          ],
        ]
      );
  },
});
