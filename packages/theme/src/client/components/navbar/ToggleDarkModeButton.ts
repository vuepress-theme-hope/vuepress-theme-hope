import { computed, defineComponent, h } from "vue";
import { AutoIcon, DarkIcon, LightIcon } from "../icons";
import {
  useDarkMode,
  useThemeData,
  useThemeLocaleData,
} from "../../composables";

import type { VNode } from "vue";
import type { DarkmodeStatus } from "../../composables";

export default defineComponent({
  name: "ToggleDarkModeButton",

  setup() {
    const themeData = useThemeData();
    const themeLocale = useThemeLocaleData();
    const { status } = useDarkMode();

    const darkmode = computed(() => themeData.value.darkmode || "auto-switch");

    const enable = computed(
      () => darkmode.value !== "disable" && darkmode.value !== "force-dark"
    );

    const toggleDarkMode = (): void => {
      const { darkmode } = themeData.value;

      if (darkmode === "auto-switch") {
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
        ? h(
            "button",
            {
              class: "toggle-dark-button",
              title: themeLocale.value.darkmodeText,
              onClick: () => toggleDarkMode(),
            },
            [
              h(AutoIcon, {
                style: { display: status.value === "auto" ? "block" : "none" },
              }),
              h(DarkIcon, {
                style: { display: status.value === "dark" ? "block" : "none" },
              }),
              h(LightIcon, {
                style: { display: status.value === "light" ? "block" : "none" },
              }),
            ]
          )
        : null;
  },
});
