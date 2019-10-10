<!--
 * @Author: Mr.Hope
 * @Date: 2019-09-20 19:03:02
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-09 19:28:02
 * @Description: 全屏组件
-->
<template>
  <div class="fullscreen-wrapper" v-if="enable">
    <i
      :class="`iconfont ${isFullscreen?'vuepress-cacelFullScreen':'vuepress-fullScreen'}`"
      @click="click"
    />
  </div>
</template>

<script>
import screenfull from 'screenfull';
export default {
  name: 'Screenfull',

  data: () => ({ isFullscreen: false }),

  computed: {
    enable() {
      return !(this.$themeConfig.fullscreen === false);
    }
  },

  methods: {
    click() {
      if (screenfull.isEnabled) screenfull.toggle();
      // TODO: 待完善
      // else this.$message({ message: 'you browser can not work', type: 'warning' });
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.isEnabled) screenfull.on('change', this.change);
    },
    destroy() {
      if (screenfull.isEnabled) screenfull.off('change', this.change);
    }
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.destroy();
  }
};
</script>

<style lang="stylus">
.fullscreen-wrapper
  margin-right 1em

  .iconfont
    font-size 1.3em
    color #aaa
    cursor pointer

  .vuepress-fullScreen:hover, .vuepress-cacelFullScreen
    color $accentColor

  .vuepress-cacelFullScreen:hover
    color #aaa
</style>
