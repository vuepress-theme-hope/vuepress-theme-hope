import { useFullscreen } from "@vueuse/core";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import ToggleFullScreenButton from "@theme-hope/components/appearance/ToggleFullScreenButton";
import { useAppearanceLocale } from "@theme-hope/composables/appearance/useAppearanceLocale";

import "../../styles/appearance/toggle-full-screen.scss";

export default defineComponent({
  name: "ToggleFullScreenButton",

  setup() {
    const appearanceLocale = useAppearanceLocale();
    const { isSupported } = useFullscreen();

    return (): VNode | null =>
      isSupported.value
        ? h("div", { class: "full-screen-wrapper" }, [
            h(
              "label",
              { class: "full-screen-title", for: "full-screen-switch" },
              appearanceLocale.value.fullscreen,
            ),
            h(ToggleFullScreenButton),
          ])
        : null;
  },
});
