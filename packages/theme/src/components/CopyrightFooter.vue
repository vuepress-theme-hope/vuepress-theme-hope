<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-07 19:18:49
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-08 21:08:12
 * @Description: 页脚
 *
 * 添加自定义页脚的预设文字
-->
<template>
  <div v-if="footer" class="footer" v-html="footer" />
</template>
<script>
export default {
  computed: {
    footer() {
      const { footer } = this.$page.frontmatter;

      return typeof footer === 'object'
        ? `<a href="${footer.link}">${footer.text}</a>`
        : typeof footer === 'string'
        ? footer
        : this.$themeConfig.footer &&
          this.$themeConfig.footer.text &&
          (this.$frontmatter.footer === true ||
            this.$themeConfig.footer.displayDefault)
        ? this.$themeConfig.footer.text
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
