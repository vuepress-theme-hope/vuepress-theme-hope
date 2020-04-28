<template>
  <div class="blogger-info">
    <div class="blogger-wrapper">
      <div class="blogger" :class="{ hasIntro }" @click="intro">
        <img v-if="bloggerAvatar" class="avatar" alt="blogger-avatar" :src="bloggerAvatar" />
        <div v-if="blogger" class="name" v-text="blogger " />
      </div>
    </div>
    <div class="blog-info-wrapper">
      <div class="num-wrapper">
        <div @click="navigate('/article/', $router, $route)">
          <div>{{i18n.article}}</div>
          <div class="num">{{$articles.length}}</div>
        </div>
        <div @click="navigate('/category/', $router, $route)">
          <div>{{i18n.category}}</div>
          <div class="num">{{$category.list.length}}</div>
        </div>
        <div @click="navigate('/tag/', $router, $route)">
          <div>{{i18n.tag}}</div>
          <div class="num">{{$tag.list.length}}</div>
        </div>
      </div>
      <BloggerLinks />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import { deepAssign, i18n } from '@mr-hope/vuepress-shared-utils';
import { ArticleMixin } from '@theme/util/articleMixin';
import BloggerLinks from '@theme/components/BloggerLinks.vue';
import { PageComputed } from 'vuepress-types';
import navigate from '@theme/util/navigate';

@Component({ components: { BloggerLinks } })
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

  private get i18n() {
    return this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog;
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
  @media (min-width: $MQNormal)
    display flex

  .blogger-wrapper
    padding 8px 0
    text-align center

    .blogger
      display inline-block
      padding 0 32px

      &.hasIntro
        cursor pointer

      .name
        margin 16px auto
        font-size 22px

        @media (min-width: $MQNormal)
          font-size 24px

      .avatar
        display block
        width 128px
        height 128px
        border-radius 50%

  .blog-info-wrapper
    @media (min-width: $MQNormal)
      display flex
      flex-direction column
      justify-content space-evenly

    .num-wrapper
      display flex
      margin 8px auto
      width 80%

      @media (min-width: $MQNormal)
        flex-direction column

      > div
        text-align center
        flex auto
        font-size 14px
        cursor pointer

        @media (min-width: $MQNormal)
          display flex
          justify-content space-evenly

        &:hover
          color var(--accent-color)

        .num
          position relative
          line-height 1.5
          font-weight 600
          font-size 20px
          margin-bottom 8px

          @media (min-width: $MQNormal)
            top -8px
</style>
