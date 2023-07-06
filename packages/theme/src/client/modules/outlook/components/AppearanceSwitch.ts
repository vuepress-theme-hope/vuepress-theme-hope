import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import {
  AutoIcon,
  DarkIcon,
  LightIcon,
} from "@theme-hope/modules/outlook/components/icons/index";
import type { DarkmodeStatus } from "@theme-hope/modules/outlook/composables/index";
import { useDarkmode } from "@theme-hope/modules/outlook/composables/index";

import "../styles/appearance-switch.scss";

export default defineComponent({
  name: "AppearanceSwitch",

  setup() {
    const { config, status } = useDarkmode();

    const toggleDarkMode = (): void => {
      if (config.value === "switch")
        status.value = (<Record<DarkmodeStatus, DarkmodeStatus>>{
          light: "dark",
          dark: "auto",
          auto: "light",
        })[status.value];
      else status.value = status.value === "light" ? "dark" : "light";
    };

    return (): VNode =>
      h(
        "button",
        {
          type: "button",
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
        ],
      );
  },
});
