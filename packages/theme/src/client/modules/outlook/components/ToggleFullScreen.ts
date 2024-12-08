import { useFullscreen } from "@vueuse/core";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables/index";
import ToggleFullScreenButton from "@theme-hope/modules/outlook/components/ToggleFullScreenButton";

import "../styles/toggle-full-screen.scss";

export default defineComponent({
  name: "ToggleFullScreenButton",

  setup() {
    const themeLocale = useThemeLocaleData();
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
