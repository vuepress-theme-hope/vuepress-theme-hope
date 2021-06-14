import { useThemeLocaleData } from "@vuepress/plugin-theme-data/lib/client";
import { defineComponent, h, onMounted, ref } from "vue";
import * as screenfull from "screenfull";
import { CancelFullScreenIcon, EnterFullScreenIcon } from "../icons";

import type { Screenfull } from "screenfull";
import type { VNode } from "vue";

export default defineComponent({
  name: "ScreenFull",

  setup() {
    const canFullscreen = ref(false);
    const isFullscreen = ref(false);
    const themeLocale = useThemeLocaleData();

    onMounted(() => {
      canFullscreen.value =
        screenfull.isEnabled && themeLocale.value.fullscreen !== false;
    });

    return (): VNode | null =>
      canFullscreen.value
        ? h(
            "button",
            {
              class: "full-screen",
              ariaPressed: isFullscreen.value,
              onClick: () => {
                if (screenfull.isEnabled)
                  void screenfull.toggle().then(() => {
                    isFullscreen.value = (
                      screenfull as Screenfull
                    ).isFullscreen;
                  });
              },
            },
            h(isFullscreen.value ? CancelFullScreenIcon : EnterFullScreenIcon)
          )
        : null;
  },
});
