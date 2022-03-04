import { ClientOnly } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";

import AppearanceMode from "@theme-hope/module/outlook/components/AppearanceMode";
import ThemeColor from "@theme-hope/module/outlook/components/ThemeColor";
import ToggleFullScreen from "@theme-hope/module/outlook/components/ToggleFullScreen";
import { usePure, useThemeData } from "@theme-hope/composables";

import type { VNode } from "vue";

export default defineComponent({
  name: "OutlookSettings",

  setup() {
    const themeData = useThemeData();
    const pure = usePure();

    const enableDarkmode = computed(
      () =>
        themeData.value.darkmode !== "disable" &&
        themeData.value.darkmode !== "force-dark"
    );

    const enableThemeColor = computed(
      () => !pure.value && Boolean(themeData.value.themeColor)
    );

    const enableFullScreen = computed(
      () => !pure.value && themeData.value.fullScreen
    );

    return (): VNode =>
      h(ClientOnly, () => [
        enableThemeColor.value ? h(ThemeColor) : null,
        enableDarkmode.value ? h(AppearanceMode) : null,
        enableFullScreen.value ? h(ToggleFullScreen) : null,
      ]);
  },
});
