<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-08 20:45:09
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-05 23:55:10
 * @Description: 主题颜色
-->
<template>
  <div class="color-picker" v-click-outside="()=>{this.showMenu = false;}" v-if="enable">
    <a @click.prevent="showMenu = !showMenu" class="color-button" href="#">
      <i :class="{ select: showMenu }" class="iconfont icon-skinfill" />
    </a>
    <transition mode="out-in" name="menu-transition">
      <div class="color-picker-menu" v-show="showMenu">
        <ThemeOptions />
      </div>
    </transition>
  </div>
</template>

<script>
import ClickOutside from './click-outside';
import ThemeOptions from './ThemeOptions.vue';

export default {
  name: 'UserSettings',

  directives: { 'click-outside': ClickOutside },

  components: { ThemeOptions },

  data: () => ({ showMenu: false }),

  computed: {
    enable() {
      const themeConfig = this.$themeConfig;

      return themeConfig.color !== false || themeConfig.allowNightmode !== false;
    }
  }
};
</script>

<style lang="stylus">
.color-picker
  position relative
  margin-right 1em

  .color-button
    display flex
    justify-content center
    align-items center
    height 100%

    .iconfont
      font-size 1.4em
      color #aaa

      &:hover, &.select
        color $accentColor

      &.select:hover
        color #aaa

    .settings-icon
      width 18px

  .color-picker-menu
    background-color #fff
    position absolute
    top 40px
    left 50%
    min-width 100px
    margin 0
    padding 1em
    border 1px solid $borderColor
    border-radius 4px
    transform translateX(-50%)
    z-index 150

    &::before
      content ''
      position absolute
      top -7px
      left 50%
      border-style solid
      border-color transparent transparent $borderColor
      border-width 0 7px 7px
      transform translateX(-50%)

    &.menu-transition-enter-active, &.menu-transition-leave-active
      transition all 0.25s ease-in-out

    &.menu-transition-enter, &.menu-transition-leave-to
      top 30px
      opacity 0

    ul
      list-style-type none
      margin 0
      padding 0

@media (max-width: $MQMobile)
  .color-picker
    .color-picker-menu
      left calc(50% - 35px)

      &::before
        left calc(50% + 35px)
</style>
