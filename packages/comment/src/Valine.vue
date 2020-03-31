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

  /** 是否启用 Valine */
  private get valineEnable() {
    const { valineConfig } = this;

    return valineConfig && valineConfig.appId && valineConfig.appKey;
  }

  /** 是否显示评论 */
  private get commentDisplay() {
    if (!this.valineEnable) return false;
    const globalEnable = this.valineConfig.comment !== false;
    const pageEnable = this.$page.frontmatter.comment;

    return (
      (globalEnable && pageEnable !== false) ||
      (!globalEnable && pageEnable === true)
    );
  }

  /** 是否显示访问量 */
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
      // 切换页面时刷新评论
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

  /** 启用 Valine */
  private valine(path: string) {
    const { valineConfig } = this;
    const valine = new (require('valine'))();

    valine.init({
      el: '#valine',
      appId: valineConfig.appId, // Your appId
      appKey: valineConfig.appKey, // Your appKey
      placeholder:
        valineConfig.placeholder ||
        this.$themeLocaleConfig.valineHolder ||
        i18n.getDefaultLocale().valineHolder,
      meta: valineConfig.meta || ['nick', 'mail', 'link'],
      notify: valineConfig.notify !== false,
      verify: valineConfig.verify || false,
      avatar: valineConfig.avatar || 'retro',
      visitor: this.visitorDisplay,
      recordIP: valineConfig.recordIP || false,
      path:
        path || (typeof window === 'undefined' ? '' : window.location.pathname),
      pageSize: valineConfig.pageSize || 10,
      lang: this.$lang === 'zh-CN' ? 'zh-cn' : 'en'
    });
  }
}
</script>

<style lang="stylus">
@require '~@mr-hope/vuepress-shared-utils/src/styles/wrapper.styl'

// add theme color for valine
.page
  .valine-wrapper
    @extend $wrapper

    #valine
      &:empty
        padding 0

      a
        color $accentColor

        &:before
          background $accentColor

        &:hover
          color $accentColor

      code, pre
        background-color #282c34

      .vwrap .vheader .vinput:focus
        border-color $accentColor

      .vwrap .vedit .vctrl span:hover
        color $accentColor

      .vbtn
        background-color #fff

        &:active, &:hover
          color #fff
          background-color $accentColor
          border-color $accentColor

      .vlist .vcard .vhead .vnick
        color $accentColor

      .info
        display none
</style>
