import { defineComponent, h, onMounted, ref } from "vue";
import * as screenfull from "screenfull";
import { CancelFullScreenIcon, EnterFullScreenIcon } from "../icons";

import type { VNode } from "vue";

export default defineComponent({
  name: "ScreenFull",

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
            h(isFullscreen.value ? CancelFullScreenIcon : EnterFullScreenIcon)
          )
        : null;
  },
});
