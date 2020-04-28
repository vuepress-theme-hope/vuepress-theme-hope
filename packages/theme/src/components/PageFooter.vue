<template>
  <div v-if="display" class="footer-wrapper">
    <MediaLinks />
    <div v-if="footerContent" class="footer" v-html="footerContent" />
    <div v-if="copyright" class="copyright" v-text="copyright" />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import MediaLinks from '@theme/components/MediaLinks.vue';

@Component({ components: { MediaLinks } })
export default class PageFooter extends Vue {
  /** 显示页脚 */
  private display() {
    return (
      ((this.$themeConfig.footer || {}).display &&
        this.$frontmatter.footer !== false) ||
      this.$frontmatter.footer
    );
  }

  /** 页脚内容 */
  private get footerContent() {
    const { footer } = this.$page.frontmatter;

    return typeof footer === 'string' ? footer : '';
  }

  /** 版权信息 */
  private get copyright() {
    return this.$frontmatter.copyright === false
      ? false
      : this.$frontmatter.copyright ||
          (this.$themeConfig.footer || {}).copyright ||
          `Copyright © 2020 ${this.$themeConfig.author}`;
  }
}
</script>

<style lang="stylus">
.footer-wrapper
  display flex
  flex-wrap wrap
  justify-content space-evenly
  align-items center
  padding 12px 30px
  border-top 1px solid var(--border-color, $borderColor)
  text-align center
  color var(--dark-color, #666)

  & > div
    @media (max-width: $MQMobileNarrow)
      width 100%

  .media-links-wrapper
    margin 0 auto

  .footer
    margin 8px 16px

  .copyright
    margin 6px auto
    font-size 12px

.page .footer-wrapper
  margin-bottom -2rem
</style>
