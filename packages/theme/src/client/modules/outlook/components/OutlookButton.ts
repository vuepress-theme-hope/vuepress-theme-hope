import { useFullscreen } from "@vueuse/core";
import type { VNode } from "vue";
import { computed, defineComponent, h, ref, watch } from "vue";
import { usePageData } from "vuepress/client";

import { usePure, useThemeData } from "@theme-hope/composables/index";
import ColorModeSwitch from "@theme-hope/modules/outlook/components/ColorModeSwitch";
import OutlookSettings from "@theme-hope/modules/outlook/components/OutlookSettings";
import { enableThemeColor } from "@theme-hope/modules/outlook/components/ThemeColor";
import ToggleFullScreen from "@theme-hope/modules/outlook/components/ToggleFullScreen";
import { OutlookIcon } from "@theme-hope/modules/outlook/components/icons/index";
import { useDarkmode } from "@theme-hope/modules/outlook/composables/index";

import "../styles/outlook-button.scss";

export default defineComponent({
  name: "OutlookButton",

  setup() {
    const themeData = useThemeData();
    const page = usePageData();
    const { canToggle } = useDarkmode();
    const { isSupported } = useFullscreen();
    const isPure = usePure();

    const open = ref(false);

    const enableFullScreen = computed(
      () => !isPure.value && themeData.value.fullscreen && isSupported,
    );

    const enabled = computed(
      () => enableThemeColor || canToggle.value || enableFullScreen.value,
    );

    watch(
      () => page.value.path,
      () => {
        open.value = false;
      },
    );

    return (): VNode | null =>
      enabled.value
        ? h(
            "div",
            { class: "vp-nav-item hide-in-mobile" },
            // Only ColorModeSwitch is enabled
            canToggle.value && !enableFullScreen.value && !enableThemeColor
              ? h(ColorModeSwitch)
              : // Only FullScreen is enabled
                enableFullScreen.value && !canToggle.value && !enableThemeColor
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
