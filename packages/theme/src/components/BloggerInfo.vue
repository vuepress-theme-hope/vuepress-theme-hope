<template>
  <div class="blogger-info">
    <div class="blogger-wrapper">
      <div class="blogger" :class="{ hasIntro }" @click="intro">
        <img v-if="bloggerAvatar" class="avatar" alt="blogger-avatar" :src="bloggerAvatar" />
        <div v-if="blogger" class="name" v-text="blogger " />
      </div>
    </div>
    <div class="num-wrapper">
      <div @click="navigate('/article/', $router, $route)">
        <div>文章</div>
        <div class="num">{{$articles.length}}</div>
      </div>
      <div @click="navigate('/category/', $router, $route)">
        <div>分类</div>
        <div class="num">{{$category.list.length}}</div>
      </div>
      <div @click="navigate('/tag/', $router, $route)">
        <div>标签</div>
        <div class="num">{{$tag.list.length}}</div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  filterArticle,
  generatePagination,
  sortArticle
} from '@theme/util/article';
import { PageComputed } from 'vuepress-types';
import { deepAssign } from '@mr-hope/vuepress-shared-utils';
import navigate from '@theme/util/navigate';

@Component
export default class BloggerInfo extends Vue {
  private navigate = navigate;

  /** 博客配置 */
  private get blogConfig() {
    return this.$themeConfig.blog || {};
  }

  /** 博主名称 */
  private get blogger() {
    return (
      this.blogConfig.blogger ||
      this.$themeConfig.author ||
      this.$page.frontmatter.blogger ||
      this.$page.frontmatter.author ||
      this.$site.title ||
      ''
    );
  }

  /** 博主头像 */
  private get bloggerAvatar() {
    return this.blogConfig.avatar || this.$themeConfig.logo || '';
  }

  /** 是否配置了个人介绍页地址 */
  private get hasIntro() {
    return Boolean(this.blogConfig.intro);
  }

  /** 文章列表 */
  private get $articles(): PageComputed[] {
    const { pages } = this.$site;

    // 先过滤再排序
    return sortArticle(
      filterArticle(pages.map((page) => deepAssign({}, page) as PageComputed))
    );
  }

  /** 文章分页 */
  private get $paginationArticles(): PageComputed[][] {
    return generatePagination(this.$articles);
  }

  /** 跳转到个人介绍 */
  private intro() {
    if (this.hasIntro)
      navigate(this.blogConfig.intro, this.$router, this.$route);
  }
}
</script>

<style lang="stylus">
.blogger-info
  .blogger-wrapper
    text-align center
    padding-top 2rem

    .blogger
      display inline-block
      padding 0 2rem

      &.hasIntro
        cursor pointer

      .name
        margin 1rem auto
        font-size 1.4em

        @media (min-width: $MQNormal)
          font-size 2rem

      .avatar
        display block
        width 8rem
        height 8rem
        border-radius 50%

        @media (min-width: $MQNormal)
          width 12rem
          height 12rem

  .num-wrapper
    display flex
    margin 0 auto 1rem
    width 80%

    @media (min-width: $MQNormal)
      display none

    > div
      text-align center
      flex auto
      font-size 14px
      cursor pointer

      &:hover
        color var(--accent-color)

      .num
        line-height 1.5
        font-weight 600
        font-size 20px
        margin-bottom 8px
</style>
