<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-10 09:51:24
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-11 17:21:32
 * @Description: 页面信息
-->
<template>
  <div class="page-title">
    <h1>{{$page.title}}</h1>
    <div class="page-info" v-if="author||visitor">
      <i class="iconfont vuepress-myfill" v-if="author" />
      <span v-if="author" v-text="author" />
      <span :data-flag-title="$page.title" :id="visitorID" class="leancloud_visitors" v-if="visitor">
        <i :class="`vuepress-${numberIcon}`" class="iconfont" />
        <span :style="numStyle" class="leancloud-visitors-count" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    numStyle: { color: '#999' },
    numberIcon: 'eyefill'
  }),

  methods: {
    // 获得评论并根据数量显示火热图标
    getCount() {
      const count = document.querySelector('.leancloud_visitors .leancloud-visitors-count').textContent;

      this.numberIcon = count && count > 100 ? 'hotfill' : 'eyefill';
    }
  },

  computed: {
    author() {
      const author = this.$page.frontmatter.author;

      return author || author === false ? '' : this.$themeConfig.author || '';
    },
    visitor() {
      if (!this.$themeConfig.valine) return false;
      const globalConfig = this.$themeConfig.valine.visitor !== false;
      const globalEnable = this.$page.frontmatter;

      return (globalEnable && pageConfig !== false) || (!globalEnable && pageConfig === true);
    },
    visitorID() {
      const base = this.$site.base;

      return base.slice(0, base.length - 1) + this.$page.path;
    }
  },

  watch: {
    $route(to, from) {
      if (to.path !== from.path)
        setTimeout(() => {
          this.getCount();
        }, 1000);
    }
  },

  mounted() {
    setTimeout(() => {
      this.getCount();
    }, 1500);
  }
};
</script>

<style lang="stylus">
@require '~@parent-theme/styles/wrapper.styl'

.page
  .page-title
    @extend $wrapper
    padding-bottom 0

  .page-title + .theme-default-content:not(.custom)
    padding-top 0

  .page-info
    color desaturate(lighten($textColor, 25%), 25%)

    .leancloud_visitors
      margin-left 0.5em

    .leancloud-visitors-count
      color #888

      h1
        margin-top -3.1rem !important
        padding-top 4.6rem !important
        margin-bottom 1rem

  .theme-default-content:not(.custom) h1:first-child
    display none
</style>
