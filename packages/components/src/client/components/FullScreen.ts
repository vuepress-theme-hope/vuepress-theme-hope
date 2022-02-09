import { defineComponent, h, onMounted, ref } from "vue";
import * as screenfull from "screenfull";
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
    const canFullscreen = ref(false);
    const isFullscreen = ref(false);

    onMounted(() => {
      canFullscreen.value = screenfull.isEnabled;
      isFullscreen.value = screenfull.isFullscreen;
    });

    return (): VNode | null =>
      canFullscreen.value && props.enable
        ? h(
            "button",
            {
              class: "full-screen",
              ariaPressed: isFullscreen.value,
              onClick: () => {
                if (screenfull.isEnabled)
                  void screenfull.toggle().then(() => {
                    isFullscreen.value = screenfull.isFullscreen;
                  });
              },
            },
            isFullscreen.value
              ? h(CancelFullScreenIcon)
              : h(EnterFullScreenIcon)
          )
        : null;
  },
});
