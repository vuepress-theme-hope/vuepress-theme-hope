<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-09 23:40:24
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-10 23:58:46
 * @Description: 评论插件
-->
<template>
  <div class="valine-wrapper" v-show="commentDisplay">
    <div id="valine" />
  </div>
</template>

<script>
export default {
  computed: {
    // 是否显示评论
    commentDisplay() {
      const valineConfig = this.$themeConfig.valine;

      if (valineConfig && valineConfig.appId && valineConfig.appKey) {
        const globalEnable = valineConfig.commet !== false;
        const pageConfig = this.$page.frontmatter.comment;

        return (globalEnable && pageConfig !== false) || (!globalEnable && pageConfig === true);
      }

      return false;
    },

    visitorDisplay() {
      const valineConfig = this.$themeConfig.valine;

      if (!valineConfig) return false;
      const globalEnable = valineConfig.visitor !== false;
      const pageConfig = this.$page.frontmatter;

      return (globalEnable && pageConfig !== false) || (!globalEnable && pageConfig === true);
    }
  },

  methods: {
    createValine() {
      const valineConfig = this.$themeConfig.valine;

      if (valineConfig) {
        const Valine = require('valine');
        const AV = require('leancloud-storage');

        if (typeof window !== 'undefined') {
          this.window = window;
          window.AV = AV;
        }

        new Valine({
          el: '#valine',
          appId: valineConfig.appId, // your appId
          appKey: valineConfig.appKey, // your appKey
          placeholder: valineConfig.placeholder || '请留言',
          meta: valineConfig.meta || ['nick', 'mail', 'link'],
          notify: valineConfig.notify !== false,
          verify: valineConfig.verify || false,
          avatar: valineConfig.avatar || 'retro',
          visitor: this.visitorDisplay,
          recordIP: valineConfig.recordIP || false,
          path: window.location.pathname,
          pageSize: valineConfig.pageSize || 10,
          lang: this.$lang === 'zh-CN' ? 'zh-cn' : 'en'
        });
      }
    }
  },

  mounted() {
    this.createValine();
  },

  watch: {
    $route(to, from) {
      if (to.path !== from.path)
        // 切换页面时刷新评论
        setTimeout(() => {
          this.createValine();
        }, 300);
    }
  }
};
</script>

<style lang="stylus">
@require '~@parent-theme/styles/wrapper.styl'

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
        // .vwrap .vheader .vinput:focus
        border-color $accentColor

      .vwrap .vedit .vctrl span:hover
        color $accentColor

      .vbtn
        background-color #fff

      .vbtn:active, .vbtn:hover
        color #fff
        background-color $accentColor

      .vlist .vcard .vhead .vnick
        color $accentColor

      .info
        display none
</style>
