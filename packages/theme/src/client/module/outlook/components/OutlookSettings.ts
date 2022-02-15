import { ClientOnly } from "@vuepress/client";
import { computed, defineComponent, h, resolveComponent } from "vue";

import { useThemeData, useThemeLocaleData } from "@theme-hope/composables";
import AppearanceSwitch from "@theme-hope/module/outlook/components/AppearanceSwitch";
import ThemeColorPicker from "@theme-hope/module/outlook/components/ThemeColorPicker";

import type { VNode } from "vue";

import "../styles/outlook-settings.scss";

export default defineComponent({
  name: "OutlookSettings",

  setup() {
    const themeData = useThemeData();
    const themeLocale = useThemeLocaleData();
    const FullScreen = resolveComponent("FullScreen");

    const fullScreenLocale = computed(
      () => themeLocale.value.outlookLocales.fullscreen
    );

    const enableDarkmode = computed(
      () =>
        themeData.value.darkmode !== "disable" &&
        themeData.value.darkmode !== "force-dark"
    );

    const enableThemeColor = computed(() =>
      Boolean(themeData.value.themeColor)
    );

    const enableFullScreen = computed(() => themeData.value.fullScreen);

    return (): VNode =>
      h(ClientOnly, () => [
        enableThemeColor.value ? h(ThemeColorPicker) : null,
        enableDarkmode.value ? h(AppearanceSwitch) : null,
        enableFullScreen.value
          ? h("div", { class: "fullscreen-wrapper" }, [
              h(
                "label",
                { class: "full-screen-title", for: "full-screen-switch" },
                fullScreenLocale.value
              ),
              h(FullScreen, { id: "full-screen-switch" }),
            ])
          : null,
      ]);
  },
});
