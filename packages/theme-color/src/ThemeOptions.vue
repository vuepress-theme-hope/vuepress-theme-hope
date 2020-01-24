<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-08 20:45:09
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-24 11:17:41
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
    <div v-if="theme.allowNightmode" class="nightmode-toggle">
      <label
        class="desc"
        for="nightmode-toggle"
        v-text="nightmodeEnable?text.nightmode[1]:text.nightmode[0]"
      />
      <NightmodeSwitch :nightmode-enable="nightmodeEnable" @nightmode-toggle="toggleNightmode" />
    </div>
  </div>
</template>

<script lang='ts'>
/* global THEME_COLOR_OPTIONS */
import { Component, Vue } from 'vue-property-decorator';
import NightmodeSwitch from './NightmodeSwitch.vue';
import { ThemeColorOptions } from '../typings';
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

@Component({ components: { NightmodeSwitch } })
export default class ThemeOptions extends Vue {
  private options = THEME_COLOR_OPTIONS;

  private theme = {} as ThemeColorData;

  private nightmodeEnable = false;

  private get text() {
    return i18n.getLocale(this.$lang).themeColor;
  }

  private mounted() {
    this.theme = {
      colorList: this.options.picker
        ? Object.keys(this.options.picker)
        : ['blue', 'red', 'green', 'orange'],
      picker: this.options.picker || defaultPicker,
      allowNightmode: this.options.allowNightmode !== false
    };
    /** 所选主题 */
    const theme = localStorage.getItem('theme');
    /** 夜间模式 */
    const nightmode = localStorage.getItem('nightmode');
    /** 获得类列表 */
    const classes = document.body.classList;

    this.nightmodeEnable = nightmode === 'true';
    if (nightmode === 'true') classes.add('theme-night');
    if (theme) this.setTheme(theme);
  }

  /** 切换夜间模式 */
  private toggleNightmode(nightmodeEnable: boolean) {
    const classes = document.body.classList;

    if (nightmodeEnable) {
      const oldColor = [...classes as any];

      classes.value = '';
      classes.add('theme-night');
      oldColor.forEach(item => {
        classes.add(item);
      });
    } else classes.remove('theme-night');

    this.nightmodeEnable = nightmodeEnable;
    localStorage.setItem('nightmode', String(nightmodeEnable));
  }

  /** 设置主题 */
  private setTheme(theme: string, moveClass = true) {
    const classes = document.body.classList;
    const themes = this.theme.colorList.map(
      colorTheme => `theme-${colorTheme}`
    );

    if (!theme) {
      if (moveClass) localStorage.removeItem('theme');
      classes.remove(...themes);

      return;
    }

    classes.remove(
      ...themes.filter(themeclass => themeclass !== `theme-${theme}`)
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

.nightmode-toggle
  display flex
  align-items center

  .desc
    padding-right 0.5em
</style>
