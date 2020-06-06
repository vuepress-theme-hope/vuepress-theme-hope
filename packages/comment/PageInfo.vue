<template>
  <div class="page-title">
    <h1>{{ $page.title }}</h1>
    <div v-if="config" class="page-info">
      <component :is="`${item}-info`" v-for="item in config" :key="$route.path + item" />
    </div>
    <hr />
  </div>
</template>

<script lang='ts'>
/* global COMMENT_OPTIONS */
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { PageInfotype, ValineOptions } from "./types";
import AuthorInfo from "./src/AuthorInfo.vue";
import CategoryInfo from "./src/CategoryInfo.vue";
import ReadTimeInfo from "./src/ReadTimeInfo.vue";
import TagInfo from "./src/TagInfo.vue";
import TimeInfo from "./src/TimeInfo.vue";
import VisitorInfo from "./src/VisitorInfo.vue";
import WordInfo from "./src/WordInfo.vue";

@Component({
  components: {
    AuthorInfo,
    CategoryInfo,
    ReadTimeInfo,
    TagInfo,
    TimeInfo,
    VisitorInfo,
    WordInfo,
  },
})
export default class PageInfo extends Vue {
  private commentConfig = COMMENT_OPTIONS;

  private get config(): PageInfotype[] | false {
    const themeConfig = this.$themeConfig.pageInfo;
    const pluginConfig = this.commentConfig.pageInfo;
    const pageConfig = this.$page.frontmatter.pageInfo;

    return pageConfig === false
      ? false
      : Array.isArray(pageConfig)
      ? pageConfig
      : pluginConfig === false
      ? false
      : Array.isArray(pluginConfig)
      ? pluginConfig
      : themeConfig === false
      ? false
      : Array.isArray(themeConfig)
      ? themeConfig
      : ["author", "visitor", "time", "category", "tag", "readTime"];
  }
}
</script>

<style lang="stylus">
@require '~@vuepress/theme-default/styles/wrapper.styl'

$pageInfoTextSize ?= 14px

.page
  .page-title
    @extend $wrapper
    padding-bottom 0.2rem
    position relative
    z-index 1

    h1
      margin-top -3.1rem !important
      padding-top 4.6rem !important
      margin-bottom 0.5rem

  .page-title + .theme-default-content:not(.custom)
    padding-top 0

  .page-info
    display flex
    justify-content flex-start
    align-content stretch
    align-items center
    flex-wrap wrap
    color var(--dark-grey, #666)
    font-size $pageInfoTextSize

    & > span
      display flex
      align-items center
      flex-shrink 0
      margin-right 0.5em
      line-height 2

      @media (min-width: $MQWide)
        font-size 1.1em

      @media (max-width: $MQMobileNarrow)
        font-size 0.875em

    .icon
      width 1em
      height 1em
      margin-right 0.25em

  .theme-default-content:not(.custom) h1:first-child
    display none
</style>
