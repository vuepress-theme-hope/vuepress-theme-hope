<template>
  <div class="theme-options">
    <ul v-if="themeColorEnabled" class="themecolor-select">
      <label for="themecolor-select" v-text="`${text.themeColor}:`" />
      <li>
        <a class="default-theme" href="#" @click.prevent="setTheme()" />
      </li>
      <li v-for="color in themeColor.list" :key="color">
        <a :style="{background: themeColor.picker[color]}" href="#" @click.prevent="setTheme(color)" />
      </li>
    </ul>
    <div v-if="switchEnabled" class="darkmode-toggle">
      <label class="desc" for="darkmode-toggle" v-text="`${text.themeMode}:`" />
      <DarkmodeSwitch />
      <ScreenFull />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { dom, i18n } from "@mr-hope/vuepress-shared-utils";
import DarkmodeSwitch from "@theme/components/DarkmodeSwitch.vue";

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

@Component({ components: { DarkmodeSwitch } })
export default class ThemeOptions extends Vue {
  private themeColor = {} as ThemeColor;

  private isDarkmode = false;

  private get text() {
    return (
      i18n.getLocale(this.$lang).themeColor ||
      i18n.getDefaultLocale().themeColor
    );
  }

  private get themeColorEnabled() {
    return this.$themeConfig.themeColor !== false;
  }

  private get switchEnabled() {
    return (
      this.$themeConfig.darkmode !== "disable" &&
      this.$themeConfig.darkmode !== "auto"
    );
  }

  private mounted() {
    this.themeColor = {
      list: this.$themeConfig.themeColor
        ? Object.keys(this.$themeConfig.themeColor)
        : Object.keys(defaultPicker),
      picker: this.$themeConfig.themeColor || defaultPicker,
    };
    /** 所选主题 */
    const theme = localStorage.getItem("theme");
    /** 获得类列表 */
    const classes = document.body.classList;

    if (theme) this.setTheme(theme);
  }

  /** 设置主题 */
  private setTheme(theme?: string) {
    const classes = document.body.classList;
    const themes = this.themeColor.list.map(
      (colorTheme) => `theme-${colorTheme}`,
    );

    if (!theme) {
      localStorage.removeItem("theme");
      classes.remove(...themes);

      return;
    }

    classes.remove(
      ...themes.filter((themeclass) => themeclass !== `theme-${theme}`),
    );

    classes.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  }
}
</script>

<style lang="stylus">
.theme-options
  font-size 14px

  .themecolor-select
    display flex
    justify-content space-around

    label
      padding-right 8px

    li
      &:first-child
        margin-right 8px

      a
        width 15px
        height 15px
        border-radius 2px
        margin 0 2px

        &.default-theme
          background-color $accentColor // must be fixed to the original accent-color

  .darkmode-toggle
    display flex
    align-items center
    margin-top 8px

    .desc
      line-height 1.5
      padding-right 8px
</style>
