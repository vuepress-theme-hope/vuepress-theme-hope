import { ClientOnly } from "@vuepress/client";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import { usePure, useThemeData } from "@theme-hope/composables/index";
import AppearanceMode from "@theme-hope/modules/outlook/components/AppearanceMode";
import ThemeColor, {
  enableThemeColor,
} from "@theme-hope/modules/outlook/components/ThemeColor";
import ToggleFullScreenButton from "@theme-hope/modules/outlook/components/ToggleFullScreenButton";

export default defineComponent({
  name: "OutlookSettings",

  setup() {
    const themeData = useThemeData();
    const pure = usePure();

    const enableFullScreen = computed(
      () => !pure.value && themeData.value.fullscreen,
    );

    return (): VNode =>
      h(ClientOnly, () => [
        enableThemeColor ? h(ThemeColor) : null,
        h(AppearanceMode),
        enableFullScreen.value ? h(ToggleFullScreenButton) : null,
      ]);
  },
});
