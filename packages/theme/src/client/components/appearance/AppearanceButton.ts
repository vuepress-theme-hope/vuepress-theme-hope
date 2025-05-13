import { useFullscreen } from "@vueuse/core";
import type { VNode } from "vue";
import { computed, defineComponent, h, ref } from "vue";
import { onContentUpdated } from "vuepress/client";

import AppearanceIcon from "@theme-hope/components/appearance/AppearanceIcon";
import AppearanceSettings from "@theme-hope/components/appearance/AppearanceSettings";
import ColorModeSwitch from "@theme-hope/components/appearance/ColorModeSwitch";
import { hasMultipleThemeColors } from "@theme-hope/components/appearance/ThemeColor";
import ToggleFullScreenButton from "@theme-hope/components/appearance/ToggleFullScreenButton";
import { useDarkMode } from "@theme-hope/composables/useDarkMode";
import { usePure } from "@theme-hope/composables/usePure";
import { useTheme } from "@theme-hope/composables/useTheme";

import "../../styles/appearance/appearance-button.scss";

export default defineComponent({
  name: "AppearanceButton",

  setup() {
    const theme = useTheme();
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
                ? h(ToggleFullScreenButton)
                : h(
                    "button",
                    {
                      type: "button",
                      class: ["vp-appearance-button", { open: open.value }],
                      tabindex: "-1",
                      "aria-hidden": true,
                    },
                    [
                      h(AppearanceIcon),
                      h(
                        "div",
                        { class: "vp-appearance-dropdown" },
                        h(AppearanceSettings),
                      ),
                    ],
                  ),
          )
        : null;
  },
});
