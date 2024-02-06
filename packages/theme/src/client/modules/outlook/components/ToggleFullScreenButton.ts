import { useFullscreen } from "@vueuse/core";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables/index";
import {
  CancelFullScreenIcon,
  EnterFullScreenIcon,
} from "@theme-hope/modules/outlook/components/icons/index";

import "../styles/toggle-full-screen-button.scss";

export default defineComponent({
  name: "ToggleFullScreenButton",

  setup() {
    const themeLocale = useThemeLocaleData();
    const { isSupported, isFullscreen, toggle } = useFullscreen();

    const fullscreenLocale = computed(
      () => themeLocale.value.outlookLocales.fullscreen,
    );

    return (): VNode | null =>
      isSupported
        ? h("div", { class: "full-screen-wrapper" }, [
            h(
              "label",
              { class: "full-screen-title", for: "full-screen-switch" },
              fullscreenLocale.value,
            ),
            h(
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
            ),
          ])
        : null;
  },
});
