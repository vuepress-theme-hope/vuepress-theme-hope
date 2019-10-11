<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-07 19:18:49
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-12 00:07:14
 * @Description: 页脚
 *
 * 添加自定义页脚的预设文字
-->
<template>
  <div class="footer" v-html="footer" v-if="footer" />
</template>
<script>
export default {
  computed: {
    footer() {
      const footer = this.$page.frontmatter.footer;

      return typeof footer === 'object'
        ? `<a href="${footer.link}">${footer.text}</a>`
        : typeof footer === 'string'
        ? footer
        : this.$page.frontmatter.footer === true || this.$themeConfig.footer.displayDefault
        ? this.$themeConfig.footer.text
        : '';
    }
  }
};
</script>
<style lang="stylus">
.footer
  padding 2.5rem
  border-top 1px solid $borderColor
  text-align center
  color lighten($textColor, 25%)
</style>
