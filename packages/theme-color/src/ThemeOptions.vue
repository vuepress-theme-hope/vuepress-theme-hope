<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-08 20:45:09
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-23 21:28:04
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

<script>
/* global THEME_COLOR_OPTIONS */
import NightmodeSwitch from './NightmodeSwitch.vue';
import { i18n } from '@mr-hope/vuepress-shared-utils';

export default {
  name: 'ThemeOptions',

  components: { NightmodeSwitch },

  data: () => ({
    options: THEME_COLOR_OPTIONS,
    theme: {},
    defaultPicker: {
      blue: '#2196f3',
      red: '#f26d6d',
      green: '#3eaf7c',
      orange: '#fb9b5f'
    },
    localeText: i18n.config.themeColor,
    nightmodeEnable: false
  }),

  computed: {
    text() {
      return this.localeText[this.$lang] || this.localeText['en-US'];
    }
  },

  mounted() {
    this.theme = {
      colorList: this.options.picker
        ? Object.keys(this.options.picker)
        : ['blue', 'red', 'green', 'orange'],
      picker: this.options.picker || this.defaultPicker,
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
  },

  methods: {
    /** 切换夜间模式 */
    toggleNightmode(nightmodeEnable) {
      const classes = document.body.classList;

      if (nightmodeEnable) {
        const oldColor = [...classes];

        classes.value = '';
        classes.add('theme-night');
        oldColor.forEach(item => {
          classes.add(item);
        });
      } else classes.remove('theme-night');

      this.nightmodeEnable = nightmodeEnable;
      localStorage.setItem('nightmode', String(nightmodeEnable));
    },

    /** 设置主题 */
    setTheme(theme, moveClass = true) {
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
};
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
