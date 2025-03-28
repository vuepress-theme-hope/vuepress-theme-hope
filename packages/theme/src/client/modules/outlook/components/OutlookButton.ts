import { useFullscreen } from "@vueuse/core";
import type { VNode } from "vue";
import { computed, defineComponent, h, ref } from "vue";
import { onContentUpdated } from "vuepress/client";

import { usePure, useThemeData } from "@theme-hope/composables/index";
import ColorModeSwitch from "@theme-hope/modules/outlook/components/ColorModeSwitch";
import OutlookSettings from "@theme-hope/modules/outlook/components/OutlookSettings";
import { hasMultipleThemeColors } from "@theme-hope/modules/outlook/components/ThemeColor";
import ToggleFullScreen from "@theme-hope/modules/outlook/components/ToggleFullScreen";
import { OutlookIcon } from "@theme-hope/modules/outlook/components/icons/index";
import { useDarkMode } from "@theme-hope/modules/outlook/composables/index";

import "../styles/outlook-button.scss";

export default defineComponent({
  name: "OutlookButton",

  setup() {
    const theme = useThemeData();
    const { canToggle } = useDarkMode();
    const { isSupported } = useFullscreen();
    const isPure = usePure();

    const open = ref(false);

    const enableFullScreen = computed(
      () => !isPure.value && theme.value.fullscreen && isSupported,
    );

    const enabled = computed(
      () => hasMultipleThemeColors || canToggle.value || enableFullScreen.value,
    );

    onContentUpdated(() => {
      open.value = false;
    });

    return (): VNode | null =>
      enabled.value
        ? h(
            "div",
            { class: "vp-nav-item hide-in-mobile" },
            // Only ColorModeSwitch is enabled
            canToggle.value &&
              !enableFullScreen.value &&
              !hasMultipleThemeColors
              ? h(ColorModeSwitch)
              : // Only FullScreen is enabled
                enableFullScreen.value &&
                  !canToggle.value &&
                  !hasMultipleThemeColors
                ? h(ToggleFullScreen)
                : h(
                    "button",
                    {
                      type: "button",
                      class: ["vp-outlook-button", { open: open.value }],
                      tabindex: "-1",
                      "aria-hidden": true,
                    },
                    [
                      h(OutlookIcon),
                      h(
                        "div",
                        { class: "vp-outlook-dropdown" },
                        h(OutlookSettings),
                      ),
                    ],
                  ),
          )
        : null;
  },
});
