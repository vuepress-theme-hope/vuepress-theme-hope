import { Component, Vue } from "vue-property-decorator";
import { getDefaultLocale } from "@mr-hope/vuepress-shared";
import DarkmodeSwitch from "@theme/components/Theme/DarkmodeSwitch.vue";
import { HopeLangI18nConfig } from "@mr-hope/vuepress-shared";

const defaultColorPicker: Record<string, string> = {
  red: "#e74c3c",
  blue: "#3498db",
  green: "#3eaf7c",
  orange: "#f39c12",
  purple: "#8e44ad",
};

interface ThemeColor {
  /** Color list */
  list: string[];
  /** Color picker */
  picker: Record<string, string>;
}

@Component({ components: { DarkmodeSwitch } })
export default class ThemeOptions extends Vue {
  private themeColor = {} as ThemeColor;

  private isDarkmode = false;

  private get text(): HopeLangI18nConfig["themeColor"] {
    return this.$themeLocaleConfig.themeColor || getDefaultLocale().themeColor;
  }

  private get themeColorEnabled(): boolean {
    return this.$themeConfig.themeColor !== false;
  }

  private get switchEnabled(): boolean {
    return (
      this.$themeConfig.darkmode !== "disable" &&
      this.$themeConfig.darkmode !== "auto"
    );
  }

  private mounted(): void {
    const theme = localStorage.getItem("theme");

    this.themeColor = {
      list: this.$themeConfig.themeColor
        ? Object.keys(this.$themeConfig.themeColor)
        : Object.keys(defaultColorPicker),
      picker: this.$themeConfig.themeColor || defaultColorPicker,
    };

    if (theme) this.setTheme(theme);
  }

  private setTheme(theme?: string): void {
    const classes = document.body.classList;
    const themes = this.themeColor.list.map(
      (colorTheme) => `theme-${colorTheme}`
    );

    if (!theme) {
      localStorage.removeItem("theme");
      classes.remove(...themes);

      return;
    }

    classes.remove(
      ...themes.filter((themeclass) => themeclass !== `theme-${theme}`)
    );

    classes.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  }
}
