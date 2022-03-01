import { defineComponent, h } from "vue";
import { useFullscreen } from "@vueuse/core";
import { CancelFullScreenIcon, EnterFullScreenIcon } from "./icons";

import type { VNode } from "vue";

import "../styles/full-screen.scss";

export default defineComponent({
  name: "FullScreen",

  props: {
    enable: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const { isSupported, isFullscreen, toggle } = useFullscreen();

    return (): VNode | null =>
      isSupported && props.enable
        ? h(
            "button",
            {
              class: "full-screen",
              ariaPressed: isFullscreen.value,
              onClick: () => toggle(),
            },
            isFullscreen.value
              ? h(CancelFullScreenIcon)
              : h(EnterFullScreenIcon)
          )
        : null;
  },
});
