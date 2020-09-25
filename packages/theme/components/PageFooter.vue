<template>
  <footer v-if="display" class="footer-wrapper">
    <MediaLinks />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="footerContent" class="footer" v-html="footerContent" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="copyright" class="copyright" v-html="copyright" />
  </footer>
</template>

<script src="./PageFooter" />

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
    @media (max-width $MQMobileNarrow)
      width 100%

  .media-links-wrapper
    margin 0

  .footer
    margin 8px 16px
    font-size 14px

  .copyright
    margin 6px auto
    font-size 13px

.page .footer-wrapper
  margin-bottom -2rem
</style>
