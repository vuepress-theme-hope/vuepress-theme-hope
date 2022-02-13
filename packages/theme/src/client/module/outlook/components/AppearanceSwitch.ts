import { computed, defineComponent, h } from "vue";

import {
  AutoIcon,
  DarkIcon,
  LightIcon,
} from "@theme-hope/module/outlook/components/icons";
import { useThemeData, useThemeLocaleData } from "@theme-hope/composables";
import { useDarkMode } from "@theme-hope/module/outlook/composables";

import type { VNode } from "vue";
import type { DarkmodeStatus } from "@theme-hope/module/outlook/composables";

import "../styles/appearance-switch.scss";

export default defineComponent({
  name: "AppearanceSwitch",

  setup() {
    const themeData = useThemeData();
    const themeLocale = useThemeLocaleData();
    const { status } = useDarkMode();

    const locale = computed(() => themeLocale.value.outlookLocales.darkmode);

    const darkmode = computed(() => themeData.value.darkmode || "auto-switch");

    const enable = computed(
      () => darkmode.value !== "disable" && darkmode.value !== "force-dark"
    );

    const toggleDarkMode = (): void => {
      if (darkmode.value === "auto-switch") {
        status.value = (
          { light: "dark", dark: "auto", auto: "light" } as Record<
            DarkmodeStatus,
            DarkmodeStatus
          >
        )[status.value];
      } else status.value = status.value === "light" ? "dark" : "light";
    };

    return (): VNode | null =>
      enable.value
        ? h("div", { class: "appearance-wrapper" }, [
            h(
              "label",
              { class: "appearance-title", for: "appearance-switch" },
              locale.value
            ),
            h(
              "button",
              {
                id: "appearance-switch",
                onClick: () => toggleDarkMode(),
              },
              [
                h(AutoIcon, {
                  style: {
                    display: status.value === "auto" ? "block" : "none",
                  },
                }),
                h(DarkIcon, {
                  style: {
                    display: status.value === "dark" ? "block" : "none",
                  },
                }),
                h(LightIcon, {
                  style: {
                    display: status.value === "light" ? "block" : "none",
                  },
                }),
              ]
            ),
          ])
        : null;
  },
});
