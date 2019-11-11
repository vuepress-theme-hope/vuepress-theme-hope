<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-07 19:18:49
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-11 18:02:08
 * @Description: 页脚
 *
 * 添加自定义页脚的预设文字
-->
<template>
  <div v-if="footerContent" class="footer" v-html="footerContent" />
</template>
<script>
export default {
  name: 'PageFooter',

  props: {
    footer: {
      type: [Object, String],
      default: ''
    }
  },

  computed: {
    footerContent() {
      const footer = this.footer || this.$page.frontmatter.footer;
      const { themeFooter } = this.$themeConfig;

      return typeof footer === 'object'
        ? `<a href="${footer.link}">${footer.text}</a>`
        : typeof footer === 'string'
        ? footer
        : themeFooter &&
          themeFooter.text &&
          (this.$frontmatter.footer === true || themeFooter.displayDefault)
        ? themeFooter.text
        : '';
    }
  }
};
</script>
<style lang="stylus">
.footer
  padding 1rem 2.5rem
  border-top 1px solid $borderColor
  text-align center
  color lighten($textColor, 25%)
</style>
