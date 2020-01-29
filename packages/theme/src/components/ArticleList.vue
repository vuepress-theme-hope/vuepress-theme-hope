<template>
  <div class="article-wrapper">
    <div v-for="article in articleList" :key="article.path" class="article">
      <router-link class="title" :to="article.path">{{ article.title }}</router-link>
      <hr class="hr" />
      <ArticleInfo :article="article" />
      <div v-if="article.excerpt" v-text="article.excerpt" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ArticleInfo from '@theme/components/ArticleInfo.vue';
import { PageComputed } from 'vuepress-types';

@Component({ components: { ArticleInfo } })
export default class ArticleList extends Vue {
  @Prop({ type: Array, default: () => [] })
  private readonly articles!: PageComputed[];

  private get articleList() {
    return this.articles.length === 0 ? this.$pagination ? this.$pagination.pages : [] : this.articles;
  }
}
</script>
<style lang="stylus">
.article-wrapper
  .article
    position relative
    margin 0 auto 20px
    padding 16px 20px
    width 100%
    overflow hidden
    border-radius 0.25rem
    box-shadow 0 1px 6px 0 rgba(0, 0, 0, 0.2)
    box-sizing border-box
    -webkit-transition all 0.3s
    transition all 0.3s

    &:last-child
      margin-bottom 0

    &:hover
      box-shadow 0 2px 16px 0 rgba(0, 0, 0, 0.2)

    .title
      position relative
      font-size 1.28rem
      line-height 36px
      display inline-block

      &:after
        content ''
        position absolute
        width 100%
        height 2px
        bottom 0
        left 0
        background-color $accentColor
        visibility hidden
        -webkit-transform scaleX(0)
        transform scaleX(0)
        transition 0.3s ease-in-out

      &:hover a
        color $accentColor

      &:hover:after
        visibility visible
        -webkit-transform scaleX(1)
        transform scaleX(1)
</style>
