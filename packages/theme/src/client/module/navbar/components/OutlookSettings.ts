import { ClientOnly } from "@vuepress/client";
import { computed, defineComponent, h, resolveComponent } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables";
import AppearanceSwitch from "@theme-hope/module/navbar/components/AppearanceSwitch";
import ThemeColorPicker from "@theme-hope/module/navbar/components/ThemeColorPicker";

import type { VNode } from "vue";

import "../styles/outlook-settings.scss";

export default defineComponent({
  name: "OutlookSettings",

  setup() {
    const themeLocale = useThemeLocaleData();
    const FullScreen = resolveComponent("FullScreen");

    const fullScreenLocale = computed(
      () => themeLocale.value.outlookLocales.fullscreen
    );

    const enableDarkmode = computed(
      () =>
        themeLocale.value.darkmode !== "disable" &&
        themeLocale.value.darkmode !== "force-dark"
    );

    const enableThemeColor = computed(
      () => themeLocale.value.themeColor !== false
    );

    return (): VNode =>
      h(ClientOnly, () => [
        enableThemeColor.value ? h(ThemeColorPicker) : null,
        enableDarkmode.value ? h(AppearanceSwitch) : null,
        FullScreen
          ? h("div", { class: "themecolor-wrapper" }, [
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
