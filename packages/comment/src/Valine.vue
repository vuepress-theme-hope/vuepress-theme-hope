<template>
  <div v-show="commentDisplay" class="valine-wrapper">
    <div id="valine" />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { ValineOptions } from "../types";
import { i18n } from "@mr-hope/vuepress-shared-utils";

@Component
export default class Valine extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  private readonly valineConfig!: ValineOptions;

  private get valineEnable() {
    const { valineConfig } = this;

    return valineConfig && valineConfig.appId && valineConfig.appKey;
  }

  private get commentDisplay() {
    if (!this.valineEnable) return false;
    const globalEnable = this.valineConfig.comment !== false;
    const pageEnable = this.$page.frontmatter.comment;

    return (globalEnable && pageEnable !== false) || pageEnable === true;
  }

  /** Whether to display view number */
  private get visitorDisplay() {
    if (!this.valineEnable) return false;
    const globalEnable = this.valineConfig.visitor !== false;
    const pageEnable = this.$page.frontmatter.visitor;

    return (globalEnable && pageEnable !== false) || pageEnable === true;
  }

  private mounted() {
    if (this.valineEnable) {
      const AV = require("leancloud-storage");

      if (typeof window !== "undefined") (window as any).AV = AV;
    }

    this.valine(this.$route.path);
  }

  @Watch("$route")
  onRouteChange(to: Route, from: Route) {
    if (to.path !== from.path)
      // Refresh comment when navigating to a new page
      Vue.nextTick(() => {
        this.valine(to.path);
      });
  }

  // Init valine
  private valine(path: string) {
    const { valineConfig } = this;
    const valine = new (require("valine"))();

    valine.init({
      el: "#valine",
      appId: valineConfig.appId, // Your appId
      appKey: valineConfig.appKey, // Your appKey
      placeholder:
        valineConfig.placeholder ||
        i18n.getLocale(this.$lang).valineHolder ||
        i18n.getDefaultLocale().valineHolder,
      meta: valineConfig.meta || ["nick", "mail", "link"],
      requiredFields: valineConfig.requiredFields || ["nick"],
      avatar: valineConfig.avatar || "retro",
      visitor: this.visitorDisplay,
      recordIP: valineConfig.recordIP || false,
      path:
        path || (typeof window === "undefined" ? "" : window.location.pathname),
      pageSize: valineConfig.pageSize || 10,
      enableQQ: valineConfig.enableQQ || true,
      emojiCDN: valineConfig.emojiCDN || "",
      emojiMaps: valineConfig.emojiMaps || null,
      lang: this.$lang === "zh-CN" ? "zh-CN" : "en",
    });
  }
}
</script>

<style lang="stylus">
@require '~@mr-hope/vuepress-shared-utils/styles/wrapper.styl'

.page
  .valine-wrapper
    @extend $wrapper

    .v[data-class=v]
      *
        color var(--grey3, #333)

      &:empty
        padding 0

      hr
        color var(--grey14, #eee)

      a
        color var(--accent-color, $accentColor)

        &:hover
          color var(--accent-color, $accentColor)

      pre, code
        color var(--dark-grey, #666)
        background-color var(--code-bg-color, #ecf4fa)

      blockquote
        color var(--dark-grey, #666)

      .vwrap
        border-color var(--grey12, #bbb)

        .vicon.actived
          fill var(--accent-color, $accentColor)

        .vemojis, .vpreview
          box-shadow 0px 0 1px var(--grey12, #bbb)

        .vheader .vinput
          border-color var(--grey12, #bbb)

          &:focus
            border-color var(--accent-color, $accentColor)

        .vcontrol .col
          color var(--grey12, #bbb)

        .vmark
          .valert
            .vtext
              color var(--background-color, #fff)

            .vcode
              background-color var(--grey12, #bbb)

              &:focus
                background-color var(--background-color, #fff)
                border-color var(--accent-color, $accentColor)

      .power
        color var(--light-grey, #999)

      .vbtn
        background-color var(--background-color, #fff)

        &:active, &:hover
          color var(--white, #fff)
          background-color var(--accent-color, $accentColor)
          border-color var(--accent-color, $accentColor)

      .vempty
        color var(--light-grey, #999)

      .vcount
        font-size 1.2em

      .vcards
        .vcard
          .vimg
            border-color var(--grey12, #bbb)

          .vhead
            .vnick
              color var(--accent-color, $accentColor)

              &:after
                content ''
                position absolute
                left 0
                right 0
                bottom 0
                height 1.5px
                background-color var(--accent-color)
                transform scaleX(0)
                transition 0.2s ease-in-out

              &:hover:after
                transform scaleX(1)

            .vsys
              background-color var(--grey14, #eee)
              color var(--light-grey, #999)

          .vh
            border-color var(--grey12, #bbb)

            .vtime
              color var(--light-grey, #999)

            .vmeta .vat
              color var(--accent-color, $accentColor)

              &:hover
                color var(--accent-color-d10, $accentColor)

          .vcontent
            color var(--grey4, #444)

            &.expand:after
              color var(--grey, #888)

          .vquote
            color var(--dark-grey, #666)

      .vpower
        display none
</style>
