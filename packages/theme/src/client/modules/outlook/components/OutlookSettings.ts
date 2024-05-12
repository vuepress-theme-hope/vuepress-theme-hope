import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";
import { ClientOnly } from "vuepress/client";

import { usePure, useThemeData } from "@theme-hope/composables/index";
import ColorMode from "@theme-hope/modules/outlook/components/ColorMode";
import ThemeColor, {
  enableThemeColor,
} from "@theme-hope/modules/outlook/components/ThemeColor";
import ToggleFullScreenButton from "@theme-hope/modules/outlook/components/ToggleFullScreenButton";

export default defineComponent({
  name: "OutlookSettings",

  setup() {
    const themeData = useThemeData();
    const isPure = usePure();

    const enableFullScreen = computed(
      () => !isPure.value && themeData.value.fullscreen,
    );

    return (): VNode =>
      h(ClientOnly, () => [
        enableThemeColor ? h(ThemeColor) : null,
        h(ColorMode),
        enableFullScreen.value ? h(ToggleFullScreenButton) : null,
      ]);
  },
});
