import { useFullscreen } from "@vueuse/core";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import {
  CancelFullScreenIcon,
  EnterFullScreenIcon,
} from "@theme-hope/modules/outlook/components/icons/index";

import "../styles/toggle-full-screen-button.scss";

export default defineComponent({
  name: "ToggleFullScreenButton",

  setup() {
    const { isSupported, isFullscreen, toggle } = useFullscreen();

    return (): VNode | null =>
      isSupported
        ? h(
            "button",
            {
              type: "button",
              id: "full-screen-switch",
              class: "full-screen",
              ariaPressed: isFullscreen.value,
              onClick: () => toggle(),
            },
            isFullscreen.value
              ? h(CancelFullScreenIcon)
              : h(EnterFullScreenIcon),
          )
        : null;
  },
});
