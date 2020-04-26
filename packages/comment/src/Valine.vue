<template>
  <div v-show="commentDisplay" class="valine-wrapper">
    <div id="valine" />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { ValineOptions } from '../types';
import { i18n } from '@mr-hope/vuepress-shared-utils';

@Component
export default class Valine extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  private readonly valineConfig!: ValineOptions;

  /** If Valine is enabled */
  private get valineEnable() {
    const { valineConfig } = this;

    return valineConfig && valineConfig.appId && valineConfig.appKey;
  }

  /** Whether to display comment */
  private get commentDisplay() {
    if (!this.valineEnable) return false;
    const globalEnable = this.valineConfig.comment !== false;
    const pageEnable = this.$page.frontmatter.comment;

    return (
      (globalEnable && pageEnable !== false) ||
      (!globalEnable && pageEnable === true)
    );
  }

  /** Whether to display view number */
  private get visitorDisplay() {
    if (!this.valineEnable) return false;
    const globalEnable = this.valineConfig.visitor !== false;
    const pageEnable = this.$page.frontmatter.visitor;

    return (
      (globalEnable && pageEnable !== false) ||
      (!globalEnable && pageEnable === true)
    );
  }

  @Watch('$route')
  onRouteChange(to: Route, from: Route) {
    if (to.path !== from.path)
      // Refresh comment when navigating to a new page
      Vue.nextTick(() => {
        this.valine(to.path);
      });
  }

  private mounted() {
    if (this.valineEnable) {
      const AV = require('leancloud-storage');

      if (typeof window !== 'undefined') (window as any).AV = AV;
    }

    this.valine(this.$route.path);
  }

  // Init valine
  private valine(path: string) {
    const { valineConfig } = this;
    const valine = new (require('valine'))();

    valine.init({
      el: '#valine',
      appId: valineConfig.appId, // Your appId
      appKey: valineConfig.appKey, // Your appKey
      placeholder:
        valineConfig.placeholder ||
        i18n.getLocale(this.$lang).valineHolder ||
        i18n.getDefaultLocale().valineHolder,
      meta: valineConfig.meta || ['nick', 'mail', 'link'],
      requiredFields: valineConfig.requiredFields || ['nick'],
      avatar: valineConfig.avatar || 'retro',
      visitor: this.visitorDisplay,
      recordIP: valineConfig.recordIP || false,
      path:
        path || (typeof window === 'undefined' ? '' : window.location.pathname),
      pageSize: valineConfig.pageSize || 10,
      enableQQ: valineConfig.enableQQ || true,
      emojiCDN: valineConfig.emojiCDN || '',
      emojiMaps: valineConfig.emojiMaps || null,
      lang: this.$lang === 'zh-CN' ? 'zh-CN' : 'en'
    });
  }
}
</script>

<style lang="stylus">
@require '~@mr-hope/vuepress-shared-utils/src/styles/wrapper.styl'

.page
  .valine-wrapper
    @extend $wrapper

    #valine
      *
        color var(--grey3, #333)

      &:empty
        padding 0

      a
        color var(--accent-color, $accentColor)

        &:before
          background var(--accent-color, $accentColor)

        &:hover
          color var(--accent-color, $accentColor)

      code, pre
        background-color var(--code-bg-color, #ecf4fa)

      blockquote
        color var(--dark-grey, #666)

      .vwrap .vheader .vinput:focus
        border-color var(--accent-color, $accentColor)

      .vicon
        &:hover, &.actived
          fill var(--accent-color, $accentColor)

      .vbtn
        background-color var(--background-color, #fff)

        &:active, &:hover
          color var(--white, #fff)
          background-color var(--accent-color, $accentColor)
          border-color var(--accent-color, $accentColor)

      .vlist .vcard .vhead .vnick
        color var(--accent-color, $accentColor)

      .vempty
        color var(--light-grey, #999)

      .vcopy
        display none

// Darkmode support
.theme-dark .page .valine-wrapper #valine
  .vlist .vcard .vhead .vsys
    background #121212
    color #4c4e4e
</style>
