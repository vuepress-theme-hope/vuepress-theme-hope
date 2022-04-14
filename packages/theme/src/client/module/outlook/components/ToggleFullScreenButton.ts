import { useFullscreen } from "@vueuse/core";
import { computed, defineComponent, h } from "vue";
import { useThemeLocaleData } from "@theme-hope/composables";
import {
  CancelFullScreenIcon,
  EnterFullScreenIcon,
} from "@theme-hope/module/outlook/components/icons";

import type { VNode } from "vue";

import "../styles/toggle-full-screen-button.scss";

export default defineComponent({
  name: "ToggleFullScreenButton",

  setup() {
    const themeLocale = useThemeLocaleData();
    const { isSupported, isFullscreen, toggle } = useFullscreen();

    const fullscreenLocale = computed(
      () => themeLocale.value.outlookLocales.fullscreen
    );

    return (): VNode | null =>
      isSupported
        ? h("div", { class: "fullscreen-wrapper" }, [
            h(
              "label",
              { class: "full-screen-title", for: "full-screen-switch" },
              fullscreenLocale.value
            ),
            h(
              "button",
              {
                class: "full-screen",
                id: "full-screen-switch",
                ariaPressed: isFullscreen.value,
                onClick: () => toggle(),
              },
              isFullscreen.value
                ? h(CancelFullScreenIcon)
                : h(EnterFullScreenIcon)
            ),
          ])
        : null;
  },
});
