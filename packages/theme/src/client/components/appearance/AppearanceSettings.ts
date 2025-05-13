import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { ClientOnly } from "vuepress/client";

import ColorMode from "@theme-hope/components/appearance/ColorMode";
import ThemeColor, {
  hasMultipleThemeColors,
} from "@theme-hope/components/appearance/ThemeColor";
import ToggleFullScreen from "@theme-hope/components/appearance/ToggleFullScreen";
import { usePure } from "@theme-hope/composables/usePure";
import { useTheme } from "@theme-hope/composables/useTheme";

export default defineComponent({
  name: "AppearanceSettings",

  setup() {
    const theme = useTheme();
    const isPure = usePure();

    const enableFullScreen = computed(
      () => !isPure.value && theme.value.fullscreen,
    );

    return (): VNode =>
      h(ClientOnly, () => [
        hasMultipleThemeColors ? h(ThemeColor) : null,
        h(ColorMode),
        enableFullScreen.value ? h(ToggleFullScreen) : null,
      ]);
  },
});
