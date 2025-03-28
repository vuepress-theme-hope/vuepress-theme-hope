import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { ClientOnly } from "vuepress/client";

import { usePure, useThemeData } from "@theme-hope/composables/index";
import ColorMode from "@theme-hope/modules/outlook/components/ColorMode";
import ThemeColor, {
  hasMultipleThemeColors,
} from "@theme-hope/modules/outlook/components/ThemeColor";
import ToggleFullScreen from "@theme-hope/modules/outlook/components/ToggleFullScreen";

export default defineComponent({
  name: "OutlookSettings",

  setup() {
    const theme = useThemeData();
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
