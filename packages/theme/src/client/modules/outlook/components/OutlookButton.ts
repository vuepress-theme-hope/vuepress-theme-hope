import { useFullscreen } from "@vueuse/core";
import type { VNode } from "vue";
import { computed, defineComponent, h, ref, watch } from "vue";
import { usePageData } from "vuepress/client";

import { usePure, useThemeData } from "@theme-hope/composables/index";
import AppearanceSwitch from "@theme-hope/modules/outlook/components/AppearanceSwitch";
import OutlookSettings from "@theme-hope/modules/outlook/components/OutlookSettings";
import { enableThemeColor } from "@theme-hope/modules/outlook/components/ThemeColor";
import ToggleFullScreenButton from "@theme-hope/modules/outlook/components/ToggleFullScreenButton";
import { OutlookIcon } from "@theme-hope/modules/outlook/components/icons/index";
import { useDarkmode } from "@theme-hope/modules/outlook/composables/index";

import "../styles/outlook-button.scss";

export default defineComponent({
  name: "OutlookButton",

  setup() {
    const { isSupported } = useFullscreen();
    const themeData = useThemeData();
    const pure = usePure();
    const page = usePageData();
    const { canToggle } = useDarkmode();

    const open = ref(false);

    const enableFullScreen = computed(
      () => !pure.value && themeData.value.fullscreen && isSupported,
    );

    watch(
      () => page.value.path,
      () => {
        open.value = false;
      },
    );

    return (): VNode | null =>
      canToggle.value || enableFullScreen.value || enableThemeColor
        ? h(
            "div",
            { class: "nav-item hide-in-mobile" },
            // Only AppearanceSwitch is enabled
            canToggle.value && !enableFullScreen.value && !enableThemeColor
              ? h(AppearanceSwitch)
              : // Only FullScreen is enabled
                enableFullScreen.value && !canToggle.value && !enableThemeColor
                ? h(ToggleFullScreenButton)
                : h(
                    "button",
                    {
                      type: "button",
                      class: ["outlook-button", { open: open.value }],
                      tabindex: "-1",
                      "aria-hidden": true,
                    },
                    [
                      h(OutlookIcon),
                      h(
                        "div",
                        { class: "outlook-dropdown" },
                        h(OutlookSettings),
                      ),
                    ],
                  ),
          )
        : null;
  },
});
