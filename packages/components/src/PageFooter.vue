<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-07 19:18:49
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-05 09:56:05
 * @Description: 页脚
 *
 * 添加自定义页脚的预设文字
-->
<template>
  <div v-if="footerContent" class="footer" v-html="footerContent" />
</template>
<script lang='ts'>
// import 'vuepress-types';
import { Component, Prop, Vue } from 'vue-property-decorator';

interface FooterConfig {
  /** 页脚文字 */
  text: string;
  /** 页脚链接 */
  link: string;
}

@Component
export default class PageFooter extends Vue {
  /** 页脚配置 */
  @Prop({ type: [Object, String], default: '' })
  private readonly footer!: string | FooterConfig;

  /** 页脚内容 */
  private get footerContent() {
    const footer = this.footer || this.$page.frontmatter.footer;
    const themeFooter = this.$themeConfig.footer;

    return typeof footer === 'object'
      ? `<a href="${footer.link}">${footer.text}</a>`
      : typeof footer === 'string'
        ? footer
        : themeFooter &&
          themeFooter.text &&
          (this.$frontmatter.footer === true || themeFooter.displayDefault)
          ? (themeFooter.text as string)
          : '';
  }
}

</script>
<style lang="stylus">
.footer
  padding 1rem 2.5rem
  border-top 1px solid $borderColor
  text-align center
  color lighten($textColor, 25%)
</style>
