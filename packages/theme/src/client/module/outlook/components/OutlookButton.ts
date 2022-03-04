import { computed, defineComponent, h, ref, watch } from "vue";
import { useRoute } from "vue-router";

import AppearanceSwitch from "@theme-hope/module/outlook/components/AppearanceSwitch";
import ToggleFullScreen from "@theme-hope/module/outlook/components/ToggleFullScreen";
import OutlookSettings from "@theme-hope/module/outlook/components/OutlookSettings";
import { OutlookIcon } from "@theme-hope/module/outlook/components/icons";
import { usePure, useThemeData } from "@theme-hope/composables";

import type { VNode } from "vue";

import "../styles/outlook-button.scss";

export default defineComponent({
  name: "OutlookButton",

  setup() {
    const themeData = useThemeData();
    const pure = usePure();
    const route = useRoute();
    const open = ref(false);

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
              ? h(ToggleFullScreen)
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
