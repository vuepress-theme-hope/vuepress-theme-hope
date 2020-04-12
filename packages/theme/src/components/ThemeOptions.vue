<template>
  <div class="theme-options">
    <ul v-if="theme.colorList && theme.colorList.length !== 0" class="themecolor-select">
      <label for="themecolor-select" v-text="`${text.themeColor}:`" />
      <li>
        <a class="default-theme" href="#" @click.prevent="setTheme()" />
      </li>
      <li v-for="color in theme.colorList" :key="color">
        <a :style="{background: theme.picker[color]}" href="#" @click.prevent="setTheme(color)" />
      </li>
    </ul>
    <div v-if="theme.darkmode === 'switch'" class="darkmode-toggle">
      <label
        class="desc"
        for="darkmode-toggle"
        v-text="isDarkmode? text.darkmode[1]: text.darkmode[0]"
      />
      <DarkmodeSwitch :darkmode-enable="isDarkmode" @darkmode-toggle="toggleDarkmode" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Mixins, Vue } from 'vue-property-decorator';
import { dom, i18n } from '@mr-hope/vuepress-shared-utils';
import Color from '@theme/util/color';
import DarkmodeSwitch from '@theme/components/DarkmodeSwitch.vue';

/** 默认颜色选择器 */
const defaultPicker: Record<string, string> = {
  red: '#e74c3c',
  blue: '#3498db',
  green: '#3eaf7c',
  orange: '#f39c12',
  purple: '#8e44ad'
};

interface ThemeColor {
  /** 颜色列表 */
  colorList: string[];
  /** 颜色选择器 */
  picker: Record<string, string>;
}

@Component({ components: { DarkmodeSwitch } })
export default class ThemeOptions extends Vue {
  private theme = {} as ThemeColor;

  private isDarkmode = false;

  private get text() {
    return (
      i18n.getLocale(this.$lang).themeColor ||
      i18n.getDefaultLocale().themeColor
    );
  }

  protected mounted() {
    this.theme = {
      colorList: this.$themeConfig.themeColor
        ? Object.keys(this.$themeConfig.themeColor)
        : Object.keys(defaultPicker),
      picker: this.$themeConfig.themeColor || defaultPicker
    };
    /** 深色模式开启状态 */
    const darkmode = this.$themeConfig.darkmode || 'auto';
    /** 所选主题 */
    const theme = localStorage.getItem('theme');
    /** 获得类列表 */
    const classes = document.body.classList;

    // 自动模式
    if (darkmode === 'auto') this.setAutoDarkmode();
    // 切换模式
    else if (darkmode === 'switch') {
      /** 深色模式 */
      const isDarkmode = Boolean(localStorage.getItem('darkmode'));

      this.isDarkmode = isDarkmode;

      if (isDarkmode) classes.add('theme-dark');
      else classes.add('theme-light');
    }
    // 被禁用
    else classes.add('theme-light');

    if (theme) this.setTheme(theme);
  }

  /** 设置自动深色模式 */
  protected setAutoDarkmode(): void {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
      .matches;
    const isLightMode = window.matchMedia('(prefers-color-scheme: light)')
      .matches;

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addListener((e) => e.matches && this.toggleDarkmode(true));
    window
      .matchMedia('(prefers-color-scheme: light)')
      .addListener((e) => e.matches && this.toggleDarkmode(false));

    if (isDarkMode) this.toggleDarkmode(true);
    else if (isLightMode) this.toggleDarkmode(false);
    else {
      const timeHour = new Date().getHours();
      this.toggleDarkmode(timeHour < 5 || timeHour >= 20);
    }
  }

  /** 切换深色模式 */
  private toggleDarkmode(isDarkmode: boolean) {
    const classes = document.body.classList;

    if (isDarkmode) dom.changeClass(classes, ['theme-dark'], ['theme-light']);
    else dom.changeClass(classes, ['theme-light'], ['theme-dark']);

    this.isDarkmode = isDarkmode;
    localStorage.setItem('darkmode', String(isDarkmode));
  }

  /** 设置主题 */
  private setTheme(theme?: string) {
    const classes = document.body.classList;
    const themes = this.theme.colorList.map(
      (colorTheme) => `theme-${colorTheme}`
    );

    if (!theme) {
      localStorage.removeItem('theme');
      classes.remove(...themes);

      return;
    }

    classes.remove(
      ...themes.filter((themeclass) => themeclass !== `theme-${theme}`)
    );

    classes.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
  }
}
</script>

<style lang="stylus">
.themecolor-select
  display flex
  justify-content space-around

  label
    padding-right 0.5em

  li
    &:first-child
      margin-right 0.5em

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

  .desc
    padding-right 0.5em
</style>
