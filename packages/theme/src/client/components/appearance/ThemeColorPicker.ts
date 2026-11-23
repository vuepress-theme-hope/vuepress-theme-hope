import type { PropType, VNode } from "vue";
import { computed, defineComponent, h, onMounted, ref } from "vue";

import { useAppearanceLocale } from "@theme-hope/composables/appearance/useAppearanceLocale";
import { useDarkMode } from "@theme-hope/composables/useDarkMode";

import "../../styles/appearance/theme-color-picker.scss";

const THEME_COLOR_KEY = "VUEPRESS_THEME_COLOR";

export default defineComponent({
  name: "ThemeColorPicker",

  props: {
    /**
     * Theme color picker config
     *
     * 主题色选择器配置
     */
    themeColors: {
      type: Object as PropType<Record<string, string>>,
      required: true,
    },
  },

  setup(props) {
    const { isDarkMode } = useDarkMode();
    const appearanceLocale = useAppearanceLocale();
    const activeColor = ref("");

    const activeThemeColors = computed(() => {
      const themeColors = new Map<string, string>(Object.entries(props.themeColors));

      for (const [name, color] of themeColors.entries()) {
        if (name.includes("light")) {
          if (!isDarkMode.value) themeColors.set(name.replace("light-", ""), color);
          themeColors.delete(name);
        }

        if (name.includes("dark")) {
          if (isDarkMode.value) themeColors.set(name.replace("dark-", ""), color);

          themeColors.delete(name);
        }
      }

      return [...themeColors.entries()].map(([name, color]) => ({
        name,
        color,
      }));
    });

    const setThemeColor = (name = ""): void => {
      const classes = document.documentElement.classList;
      // oxlint-disable-next-line no-shadow
      const colorNames = activeThemeColors.value.map(({ name }) => name);

      if (!name) {
        localStorage.removeItem(THEME_COLOR_KEY);
        classes.remove(...colorNames);
        activeColor.value = "";

        return;
      }

      classes.remove(...colorNames.filter((themeColorClass) => themeColorClass !== name));

      classes.add(name);
      localStorage.setItem(THEME_COLOR_KEY, name);
      activeColor.value = name;
    };

    onMounted(() => {
      const theme = localStorage.getItem(THEME_COLOR_KEY);

      if (theme) setThemeColor(theme);
    });

    return (): VNode =>
      h(
        "ul",
        {
          class: "vp-theme-color-picker",
          role: "group",
          "aria-label": appearanceLocale.value.themeColor,
        },
        [
          h(
            "li",
            h("button", {
              type: "button",
              class: "theme-color",
              "aria-label": appearanceLocale.value.themeColor,
              "aria-pressed": activeColor.value === "",
              onClick: () => {
                setThemeColor();
              },
            }),
          ),
          activeThemeColors.value.map(({ name, color }) =>
            h(
              "li",
              h("button", {
                type: "button",
                class: "theme-color",
                style: { background: color },
                "aria-label": name,
                "aria-pressed": activeColor.value === name,
                onClick: () => {
                  setThemeColor(name);
                },
              }),
            ),
          ),
        ],
      );
  },
});
