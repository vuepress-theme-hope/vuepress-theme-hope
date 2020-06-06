<template>
  <Common :sidebar="false">
    <main class="page not-found">
      <h1>404</h1>
      <blockquote v-text="msg" />
      <div class="action-button" @click="back">{{ i18n.back }}</div>
      <router-link class="action-button" to="/">{{ i18n.home }}</router-link>
    </main>
  </Common>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import Common from "@theme/components/Common.vue";
import { i18n } from "@mr-hope/vuepress-shared-utils";

@Component({ components: { Common } })
export default class NotFound extends Vue {
  private get i18n() {
    return this.$themeLocaleConfig.error404 || i18n.getDefaultLocale().error404;
  }

  private get msg() {
    return this.i18n.hint[Math.floor(Math.random() * this.i18n.hint.length)];
  }

  private back() {
    window.history.go(-1);
  }
}
</script>

<style lang="stylus">
.not-found
  display block
  max-width $homePageWidth
  margin 0px auto
  padding ($navbarHeight + 1rem) 2rem 0 !important

  .action-button
    display inline-block
    font-size 1rem
    color var(--white)
    background-color var(--accent-color)
    margin 0 0.25rem
    padding 0.5rem 1rem
    border-radius 0.25rem
    transition background-color 0.1s ease
    box-sizing border-box
    border-bottom 1px solid var(--accent-color-d10)

    &:hover
      cursor pointer
      background-color var(--accent-color-l10)
</style>
