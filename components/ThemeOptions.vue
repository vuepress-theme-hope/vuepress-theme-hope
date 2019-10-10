<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-08 20:45:09
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-10 08:45:42
 * @Description: 主题颜色选择
-->
<template>
  <div class="theme-options">
    <ul class="color-theme-options" v-if="theme.color && theme.color.length !== 0">
      <li>
        <a @click.prevent="setTheme()" class="default-theme" href="#" />
      </li>
      <li :key="color" v-for="color in theme.color">
        <a
          :class="`${color}-theme`"
          :style="{background: colors[color]}"
          @click.prevent="setTheme(color)"
          href="#"
        />
      </li>
    </ul>
    <div class="dark-theme-options toggle-option" v-if="theme.allowNightmode">
      <label for="dark-theme-toggle">{{text}}:&nbsp;</label>
      <input @change="toggleDarkTheme" id="dark-theme-toggle" type="checkbox" v-model="darkTheme" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemeOptions',

  data: () => ({
    theme: {},
    colors: {
      blue: '#2196f3',
      red: '#f26d6d',
      green: '#3eaf7c',
      orange: '#fb9b5f'
    },
    localeText: {
      'zh-CN': '开启夜间模式',
      'en-US': 'Nightmode Status'
    },
    darkTheme: 'false'
  }),

  computed: {
    text() {
      return this.localeText[this.$lang] || 'Nightmode Status';
    }
  },

  mounted() {
    const themeConfig = this.$themeConfig;

    this.theme = {
      color: themeConfig.color || ['blue', 'red', 'green', 'orange'],
      allowNightmode: themeConfig.allowNightmode !== false
    };
    /** 所选主题 */
    const theme = localStorage.getItem('theme');
    /** 夜间模式 */
    const nightmode = localStorage.getItem('nightmode');
    /** 获得类列表 */
    const classes = document.body.classList;

    this.darkTheme = nightmode === 'true';
    if (nightmode === 'true') classes.add(`theme-night`);
    if (theme) this.setTheme(theme);
  },

  methods: {
    /** 切换夜间模式 */
    toggleDarkTheme() {
      const classes = document.body.classList;
      if (this.darkTheme) {
        const oldColor = [...classes];

        classes.value = '';
        classes.add(`theme-night`);
        oldColor.forEach(item => {
          classes.add(item);
        });
      } else classes.remove(`theme-night`);

      localStorage.setItem('nightmode', this.darkTheme);
    },

    /** 设置主题 */
    setTheme(theme, moveClass = true) {
      const colorThemes = this.theme.color;
      const classes = document.body.classList;
      const themes = colorThemes.map(colorTheme => `theme-${colorTheme}`);

      if (!theme) {
        if (moveClass) localStorage.removeItem('theme');
        classes.remove(...themes);

        return;
      }

      classes.remove(...themes.filter(t => t !== `theme-${theme}`));

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
.color-theme-options
  display flex
  justify-content space-around

  li
    width 33%
    text-align center

    a
      width 15px
      height 15px
      border-radius 2px

      &.default-theme
        background-color $accentColor

      &.blue-theme
        background-color $blueAccentColor

      &.red-theme
        background-color $redAccentColor

.toggle-option
  display flex
  justify-content space-between
  align-items center

  label
    padding-right 0.25em
</style>
