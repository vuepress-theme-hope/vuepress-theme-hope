<template>
  <div class="blogger-info">
    <div class="blogger-wrapper">
      <div class="blogger" :class="{ hasIntro }" @click="intro">
        <img v-if="bloggerAvatar" class="avatar" alt="blogger-avatar" :src="bloggerAvatar" />
        <h3 v-if="blogger" class="name" v-text="blogger " />
      </div>
    </div>
    <div class="num-wrapper">
      <div @click="navigate('/article/', $router, $route)">
        <div class="num">{{$articles.length}}</div>
        <div>文章</div>
      </div>
      <div @click="navigate('/tag/', $router, $route)">
        <div class="num">{{$tag.list.length}}</div>
        <div>标签</div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import ArticleMixin from '@theme/util/articleMixin';
import { PageComputed } from 'vuepress-types';
import navigate from '@theme/util/navigate';

@Component
export default class BloggerInfo extends Mixins(ArticleMixin) {
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

      .avatar
        display block
        width 8rem
        height 8rem
        border-radius 50%

  .num-wrapper
    display flex
    margin 0 auto 1rem
    width 80%

    > div
      text-align center
      flex auto
      font-size 14px
      cursor pointer

      &:hover
        color $accentColor

      &:first-child
        border-right 1px solid #333

      .num
        line-height 1.5
        font-weight 600
        font-size 20px
</style>
