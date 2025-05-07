import { useFullscreen } from "@vueuse/core";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import ToggleFullScreenButton from "@theme-hope/components/appearance/ToggleFullScreenButton";
import { useThemeLocale } from "@theme-hope/composables/useTheme";

import "../../styles/appearance/toggle-full-screen.scss";

export default defineComponent({
  name: "ToggleFullScreenButton",

  setup() {
    const themeLocale = useThemeLocale();
    const { isSupported } = useFullscreen();

    const fullscreenLocale = computed(
      () => themeLocale.value.outlookLocales.fullscreen,
    );

    return (): VNode | null =>
      isSupported.value
        ? h("div", { class: "full-screen-wrapper" }, [
            h(
              "label",
              { class: "full-screen-title", for: "full-screen-switch" },
              fullscreenLocale.value,
            ),
            h(ToggleFullScreenButton),
          ])
        : null;
  },
});
