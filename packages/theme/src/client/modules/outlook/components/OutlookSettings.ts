import { ClientOnly } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";

import AppearanceMode from "@theme-hope/modules/outlook/components/AppearanceMode.js";
import ThemeColor from "@theme-hope/modules/outlook/components/ThemeColor.js";
import ToggleFullScreenButton from "@theme-hope/modules/outlook/components/ToggleFullScreenButton.js";
import { usePure, useThemeData } from "@theme-hope/composables/index.js";

import type { VNode } from "vue";

export default defineComponent({
  name: "OutlookSettings",

  setup() {
    const themeData = useThemeData();
    const pure = usePure();

    const enableDarkmode = computed(
      () =>
        themeData.value.darkmode !== "disable" &&
        themeData.value.darkmode !== "enable"
    );

    const enableThemeColor = computed(
      () => !pure.value && Boolean(themeData.value.themeColor)
    );

    const enableFullScreen = computed(
      () => !pure.value && themeData.value.fullscreen
    );

    return (): VNode =>
      h(ClientOnly, () => [
        enableThemeColor.value ? h(ThemeColor) : null,
        enableDarkmode.value ? h(AppearanceMode) : null,
        enableFullScreen.value ? h(ToggleFullScreenButton) : null,
      ]);
  },
});
