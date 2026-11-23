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
import { useTheme, useThemeLocale } from "@theme-hope/composables/useTheme";

import "../../styles/appearance/appearance-button.scss";

export default defineComponent({
  name: "AppearanceButton",

  setup() {
    const theme = useTheme();
    const themeLocale = useThemeLocale();
    const { canToggle } = useDarkMode();
    const { isSupported } = useFullscreen();
    const isPure = usePure();

    const open = ref(false);
    const button = ref<HTMLButtonElement>();

    const enableFullScreen = computed(() => !isPure.value && theme.value.fullscreen && isSupported);

    const enabled = computed(
      () => hasMultipleThemeColors || canToggle.value || enableFullScreen.value,
    );

    const appearanceLabel = computed(
      () => themeLocale.value.outlookLocales.appearance ?? "Appearance",
    );

    const close = (): void => {
      open.value = false;
    };

    onContentUpdated(close);

    return (): VNode | null => {
      if (!enabled.value) return null;

      // Only ColorModeSwitch is enabled
      if (canToggle.value && !enableFullScreen.value && !hasMultipleThemeColors)
        return h("div", { class: "vp-nav-item hide-in-mobile" }, h(ColorModeSwitch));

      // Only FullScreen is enabled
      if (enableFullScreen.value && !canToggle.value && !hasMultipleThemeColors)
        return h("div", { class: "vp-nav-item hide-in-mobile" }, h(ToggleFullScreenButton));

      return h(
        "div",
        {
          class: "vp-nav-item hide-in-mobile vp-appearance",
          onFocusout: (event: FocusEvent) => {
            const next = event.relatedTarget as Node | null;

            if (open.value && (!next || !(event.currentTarget as HTMLElement).contains(next)))
              close();
          },
          onKeydown: (event: KeyboardEvent) => {
            if (event.key === "Escape" && open.value) {
              event.stopPropagation();
              close();
              button.value?.focus();
            }
          },
        },
        [
          h(
            "button",
            {
              ref: button,
              type: "button",
              class: ["vp-appearance-button", { open: open.value }],
              "aria-label": appearanceLabel.value,
              "aria-expanded": open.value,
              "aria-controls": "appearance-dropdown",
              onClick: () => {
                open.value = !open.value;
              },
            },
            h(AppearanceIcon),
          ),
          h(
            "div",
            { id: "appearance-dropdown", class: "vp-appearance-dropdown" },
            h(AppearanceSettings),
          ),
        ],
      );
    };
  },
});
