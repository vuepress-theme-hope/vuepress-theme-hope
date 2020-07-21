import { Component, Vue } from "vue-property-decorator";
import { HopeLangI18nConfigItem, i18n } from "@mr-hope/vuepress-shared-utils";
import DarkmodeSwitch from "@theme/components/Theme/DarkmodeSwitch.vue";

/** 默认颜色选择器 */
const defaultPicker: Record<string, string> = {
  red: "#e74c3c",
  blue: "#3498db",
  green: "#3eaf7c",
  orange: "#f39c12",
  purple: "#8e44ad",
};

interface ThemeColor {
  /** 颜色列表 */
  list: string[];
  /** 颜色选择器 */
  picker: Record<string, string>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
@Component({ components: { DarkmodeSwitch } })
export default class ThemeOptions extends Vue {
  private themeColor = {} as ThemeColor;

  private isDarkmode = false;

  private get text(): HopeLangI18nConfigItem["themeColor"] {
    return (
      i18n.getLocale(this.$lang).themeColor ||
      i18n.getDefaultLocale().themeColor
    );
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
    /** 所选主题 */
    const theme = localStorage.getItem("theme");

    this.themeColor = {
      list: this.$themeConfig.themeColor
        ? Object.keys(this.$themeConfig.themeColor)
        : Object.keys(defaultPicker),
      picker: this.$themeConfig.themeColor || defaultPicker,
    };

    if (theme) this.setTheme(theme);
  }

  /** 设置主题 */
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
