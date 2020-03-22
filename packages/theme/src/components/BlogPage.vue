<template>
  <div class="page blog">
    <div v-if="$frontmatter.hero !== false" class="hero" :style="{ ...bgImageStyle }">
      <div
        class="mask"
        :style="{
      background: `url(${
        $frontmatter.bgImage? $withBase($frontmatter.bgImage): require('../assets/homeImage.jpg')
      }) center/cover no-repeat`
      }"
      />
      <ModuleTransition>
        <img
          v-if="$frontmatter.heroImage"
          :style="heroImageStyle || {}"
          :src="$withBase($frontmatter.heroImage)"
          alt="hero"
        />
      </ModuleTransition>
      <ModuleTransition delay="0.04">
        <h1 v-if="$frontmatter.showTitle !== false">{{ $frontmatter.heroText || $title || 'Hope' }}</h1>
      </ModuleTransition>

      <ModuleTransition delay="0.08">
        <p v-if="$description" class="description" v-text="$description" />
      </ModuleTransition>
    </div>

    <ModuleTransition delay="0.16">
      <div class="blog-page-wrapper">
        <div class="blog-list">
          <!-- 博客列表 -->
          <ArticleList />
        </div>
        <div class="blogger-info-wrapper">
          <BloggerInfo />
          <h4>
            <CategoryIcon />分类
          </h4>
          <CategoryList />
          <hr />
          <h4 v-if="$tag.list.length !== 0">
            <TagIcon />标签
          </h4>
          <TagList />
        </div>
      </div>
    </ModuleTransition>

    <ModuleTransition delay="0.36">
      <Content :key="$route.path" class="home-center" custom />
    </ModuleTransition>

    <!-- 页脚 -->
    <ModuleTransition delay="0.40">
      <PageFooter :key="$route.path" />
    </ModuleTransition>
  </div>
</template>

<script lang='ts'>
import { Component, Mixins, Vue, Watch } from 'vue-property-decorator';
import ArticleList from '@theme/components/ArticleList.vue';
import BloggerInfo from '@theme/components/BloggerInfo.vue';
import CategoryIcon from '@mr-hope/vuepress-shared-utils/icons/CategoryIcon.vue';
import CategoryList from '@theme/components/CategoryList.vue';
import ModuleTransition from '@theme/components/ModuleTransition.vue';
import { PageComputed } from 'vuepress-types';
import TagIcon from '@mr-hope/vuepress-shared-utils/icons/TagIcon.vue';
import TagList from '@theme/components/TagList.vue';
import { deepAssign } from '@mr-hope/vuepress-shared-utils';

@Component({
  components: {
    ArticleList,
    BloggerInfo,
    CategoryIcon,
    CategoryList,
    TagIcon,
    TagList,
    ModuleTransition
  }
})
export default class BlogPage extends Vue {
  private get heroImageStyle() {
    const defaultStyle = {
      maxHeight: '200px',
      margin:
        this.$frontmatter.showTitle === false ? '6rem auto 1.5rem' : '1rem auto'
    };

    return { ...defaultStyle, ...this.$frontmatter.heroImageStyle };
  }

  private get bgImageStyle() {
    const defaultBgImageStyle = {
      height: '350px',
      textAlign: 'center',
      overflow: 'hidden'
    };
    const { bgImageStyle = {} } = this.$frontmatter;

    return { ...defaultBgImageStyle, ...bgImageStyle };
  }

  private heroHeight() {
    return (document.querySelector('.hero') as Element).clientHeight;
  }
}
</script>

<style lang="stylus">
.page.blog
  padding $navbarHeight 0 0
  margin 0px auto

  .hero
    position relative

    .mask
      position absolute
      top 0
      bottom 0
      left 0
      right 0

      &:after
        display block
        content ' '
        background #888
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        z-index 1
        opacity 0.2

    & > :not(.mask)
      position relative
      z-index 2

    h1
      margin 7rem auto 1.8rem
      font-size 2.5rem

    img + h1
      margin 0 auto

    h1, .description, .action
      color #fff

    .description
      margin 1.8rem auto
      font-size 1.6rem
      line-height 1.3

    img + h1 + .description
      margin 1rem auto

  .blog-page-wrapper
    display flex
    align-items flex-start
    margin 20px auto 0
    max-width 1126px

    @media (min-width: $MQMobile)
      padding 0 1rem

    @media (min-width: $MQNarrow)
      padding 0 2rem

    .blog-list
      flex auto
      width 0

    .blogger-info-wrapper
      position -webkit-sticky
      position sticky
      top 70px
      transition all 0.3s
      margin-left 15px
      margin-bottom 12px
      flex 0 0 300px
      height auto
      box-shadow 0 1px 6px 0 rgba(0, 0, 0, 0.2)
      border-radius 4px
      box-sizing border-box
      padding 0 15px

      &:hover
        box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.2)

      .icon
        width 16px
        height 16px
        margin 0 6px

@media (max-width: $MQMobile)
  .page.blog
    padding-left 1.5rem
    padding-right 1.5rem

    .hero
      margin 0 -1.5rem
      height 450px

      img
        max-height 210px
        margin 2rem auto 1.2rem

      h1
        margin 6rem auto 1.8rem
        font-size 2rem

      .description
        font-size 1.2rem

      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem

    .blog-page-wrapper
      .blogger-info-wrapper
        display none !important

@media (max-width: $MQMobileNarrow)
  .page.blog
    padding-left 1.5rem
    padding-right 1.5rem

    .hero
      margin 0 -1.5rem
      height 350px

      img
        max-height 210px
        margin 2rem auto 1.2rem

      h1
        margin 6rem auto 1.8rem
        font-size 2rem

      h1, .description, .action
        margin 1.2rem auto

      .description
        font-size 1.2rem

      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem

    .blog-page-wrapper
      .blogger-info-wrapper
        display none !important
</style>
