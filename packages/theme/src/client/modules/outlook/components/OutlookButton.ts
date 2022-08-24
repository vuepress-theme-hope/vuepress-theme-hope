import { useFullscreen } from "@vueuse/core";
import { computed, defineComponent, h, ref, watch } from "vue";
import { useRoute } from "vue-router";

import AppearanceSwitch from "@theme-hope/modules/outlook/components/AppearanceSwitch.js";
import ToggleFullScreenButton from "@theme-hope/modules/outlook/components/ToggleFullScreenButton.js";
import OutlookSettings from "@theme-hope/modules/outlook/components/OutlookSettings.js";
import { OutlookIcon } from "@theme-hope/modules/outlook/components/icons/index.js";
import { usePure, useThemeData } from "@theme-hope/composables/index.js";

import type { VNode } from "vue";

import "../styles/outlook-button.scss";

export default defineComponent({
  name: "OutlookButton",

  setup() {
    const { isSupported } = useFullscreen();
    const themeData = useThemeData();
    const pure = usePure();
    const route = useRoute();
    const open = ref(false);

    const enableDarkmode = computed(
      () =>
        themeData.value.darkmode !== "disable" &&
        themeData.value.darkmode !== "enable"
    );

    const enableThemeColor = computed(
      () => !pure.value && Boolean(themeData.value.themeColor)
    );

    const enableFullScreen = computed(
      () => !pure.value && themeData.value.fullscreen && isSupported
    );

    watch(
      () => route.path,
      () => {
        open.value = false;
      }
    );

    return (): VNode | null =>
      enableDarkmode.value || enableFullScreen.value || enableThemeColor.value
        ? h(
            "div",
            { class: "nav-item hide-in-mobile" },
            // only AppearanceSwitch is enabled
            enableDarkmode.value &&
              !enableFullScreen.value &&
              !enableThemeColor.value
              ? h(AppearanceSwitch)
              : // only FullScreen is enabled
              enableFullScreen.value &&
                !enableDarkmode.value &&
                !enableThemeColor.value
              ? h(ToggleFullScreenButton)
              : h(
                  "button",
                  {
                    class: ["outlook-button", { open: open.value }],
                    tabindex: "-1",
                    ariaHidden: true,
                  },
                  [
                    h(OutlookIcon),
                    h("div", { class: "outlook-dropdown" }, h(OutlookSettings)),
                  ]
                )
          )
        : null;
  },
});
