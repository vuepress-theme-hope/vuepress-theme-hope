<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-08 20:45:09
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-22 15:12:52
 * @Description: 主题颜色选择
-->
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
    <div v-if="theme.allowDarkmode" class="darkmode-toggle">
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
/* global THEME_COLOR_OPTIONS */
import { Component, Vue } from 'vue-property-decorator';
import DarkmodeSwitch from './DarkmodeSwitch.vue';
import { ThemeColorOptions } from '../types';
import { i18n } from '@mr-hope/vuepress-shared-utils';

/** 默认颜色选择器 */
const defaultPicker: Record<string, string> = {
  blue: '#2196f3',
  red: '#f26d6d',
  green: '#3eaf7c',
  orange: '#fb9b5f'
};

interface ThemeColorData extends ThemeColorOptions {
  colorList: string[];
}

@Component({ components: { DarkmodeSwitch } })
export default class ThemeOptions extends Vue {
  private options = THEME_COLOR_OPTIONS;

  private theme = {} as ThemeColorData;

  private isDarkmode = false;

  private get text() {
    return (
      this.$themeLocaleConfig.themeColor || i18n.getDefaultLocale().themeColor
    );
  }

  private mounted() {
    this.theme = {
      colorList: this.options.picker
        ? Object.keys(this.options.picker)
        : ['blue', 'red', 'green', 'orange'],
      picker: this.options.picker || defaultPicker,
      allowDarkmode: this.options.allowDarkmode !== false
    };
    /** 所选主题 */
    const theme = localStorage.getItem('theme');
    /** 夜间模式 */
    const darkmode = localStorage.getItem('darkmode');
    /** 获得类列表 */
    const classes = document.body.classList;

    this.isDarkmode = darkmode === 'true';

    if (darkmode === 'true') classes.add('theme-dark');
    else classes.add('theme-light');

    if (theme) this.setTheme(theme);
  }

  /** 切换夜间模式 */
  private toggleDarkmode(isDarkmode: boolean) {
    const classes = document.body.classList;

    const changeClass = (
      domClass: DOMTokenList,
      insert: string[],
      remove: string[]
    ): void => {
      domClass.remove(...remove);
      const oldClasses = [...(domClass as any)];
      domClass.value = '';
      domClass.add(...insert, ...oldClasses);
    };

    if (isDarkmode) changeClass(classes, ['theme-dark'], ['theme-light']);
    else changeClass(classes, ['theme-light'], ['theme-dark']);

    this.isDarkmode = isDarkmode;
    localStorage.setItem('darkmode', String(isDarkmode));
  }

  /** 设置主题 */
  private setTheme(theme: string, moveClass = true) {
    const classes = document.body.classList;
    const themes = this.theme.colorList.map(
      (colorTheme) => `theme-${colorTheme}`
    );

    if (!theme) {
      if (moveClass) localStorage.removeItem('theme');
      classes.remove(...themes);

      return;
    }

    classes.remove(
      ...themes.filter((themeclass) => themeclass !== `theme-${theme}`)
    );

    if (moveClass) {
      classes.add(`theme-${theme}`);
      localStorage.setItem('theme', theme);
    } else {
      localStorage.removeItem('theme');
      classes.remove(`theme-${theme}`);
    }
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
        background-color $accentColor

.darkmode-toggle
  display flex
  align-items center

  .desc
    padding-right 0.5em
</style>
