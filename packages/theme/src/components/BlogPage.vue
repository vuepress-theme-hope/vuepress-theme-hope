<template>
  <div class="page blog">
    <div class="blog-page-wrapper">
      <ModuleTransition>
        <!-- 博主信息 -->
        <div class="blogger-info-wrapper">
          <ModuleTransition :delay="0.04">
            <BloggerInfo />
          </ModuleTransition>

          <!-- 文章 -->
          <ModuleTransition :delay="0.08">
            <div class="article-wrapper">
              <div class="title" @click="$router.push('/article/')">
                <ArticleIcon />
                <span class="num">{{$articles.length}}</span>
                {{i18n.article}}
              </div>
              <hr />
              <div class="sticky-article-list">
                <li
                  v-for="article in $stickArticles"
                  :key="article.url"
                  class="sticky-article"
                  @click="$router.push(article.url)"
                >{{article.title}}</li>
              </div>
            </div>
          </ModuleTransition>

          <!-- 分类 -->
          <ModuleTransition :delay="0.12">
            <div class="category-wrapper">
              <div
                v-if="$category.list.length !== 0"
                class="title"
                @click="$router.push('/category/')"
              >
                <CategoryIcon />
                <span class="num">{{$category.list.length}}</span>
                {{i18n.category}}
              </div>
              <hr />
              <ModuleTransition :delay="0.16">
                <CategoryList />
              </ModuleTransition>
            </div>
          </ModuleTransition>

          <!-- 标签 -->
          <ModuleTransition :delay="0.20">
            <div class="tag-wrapper">
              <div v-if="$tag.list.length !== 0" class="title" @click="$router.push('/tag/')">
                <TagIcon />
                <span class="num">{{$tag.list.length}}</span>
                {{i18n.tag}}
              </div>
              <hr />
              <ModuleTransition :delay="0.24">
                <TagList />
              </ModuleTransition>
            </div>
          </ModuleTransition>

          <ModuleTransition :delay="0.28">
            <TimelineList />
          </ModuleTransition>
        </div>
      </ModuleTransition>

      <div class="blog-list-wrapper">
        <main class="blog-list">
          <ModuleTransition :delay="0.08">
            <component :is="componentName" v-if="componentName" />
            <BlogHero v-else-if="$frontmatter.home" />
            <h1 v-else>文章列表</h1>
          </ModuleTransition>

          <!-- 文章列表 -->
          <ModuleTransition :delay="0.24">
            <ArticleList v-if="displayArticles" :key="$route.path" />
          </ModuleTransition>
        </main>
      </div>

      <div class="blog-detail-wrapper">
        <ModuleTransition :delay="0.28">
          <TimelineList />
        </ModuleTransition>
      </div>
    </div>

    <!-- Markdown 内容 -->
    <ModuleTransition :delay="0.28">
      <Content :key="$route.path" class="home-center" custom />
    </ModuleTransition>

    <!-- 页脚 -->
    <ModuleTransition :delay="0.32">
      <PageFooter :key="$route.path" />
    </ModuleTransition>
  </div>
</template>

<script lang='ts'>
import { ArticleMixin, StickyMixin } from '@theme/util/articleMixin';
import { Component, Mixins, Vue } from 'vue-property-decorator';
import { capitalize, deepAssign, i18n } from '@mr-hope/vuepress-shared-utils';
import ArticleIcon from '@mr-hope/vuepress-shared-utils/icons/ArticleIcon.vue';
import ArticleList from '@theme/components/ArticleList.vue';
import BlogHero from '@theme/components/BlogHero.vue';
import BloggerInfo from '@theme/components/BloggerInfo.vue';
import CategoryIcon from '@mr-hope/vuepress-shared-utils/icons/CategoryIcon.vue';
import CategoryList from '@theme/components/CategoryList.vue';
import ModuleTransition from '@theme/components/ModuleTransition.vue';
import { PageComputed } from 'vuepress-types';
import PageFooter from '@theme/components/PageFooter.vue';
import Password from '@theme/components/Password.vue';
import TagIcon from '@mr-hope/vuepress-shared-utils/icons/TagIcon.vue';
import TagList from '@theme/components/TagList.vue';
import Timeline from '@theme/components/Timeline.vue';
import TimelineList from '@theme/components/TimelineList.vue';

@Component({
  components: {
    ArticleIcon,
    ArticleList,
    BlogHero,
    BloggerInfo,
    CategoryIcon,
    CategoryList,
    ModuleTransition,
    PageFooter,
    Password,
    TagIcon,
    TagList,
    Timeline,
    TimelineList
  }
})
export default class BlogPage extends Mixins(ArticleMixin, StickyMixin) {
  private get i18n() {
    return this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog;
  }

  private heroHeight() {
    return (document.querySelector('.blog-hero') as Element).clientHeight;
  }

  /** 是否显示文章 */
  private get displayArticles() {
    const { path } = this.$route;

    return !path.includes('/category') && !path.includes('/timeline');
  }

  /** 组件名称 */
  private get componentName() {
    const pathName = capitalize(this.$route.path.split('/')[1]);

    if (['Category', 'Tag'].includes(pathName)) return `${pathName}List`;
    else if (pathName === 'Timeline') return pathName;

    return '';
  }
}
</script>

<style lang="stylus">
.page.blog
  padding $navbarHeight 0 0
  margin 0px auto

  @media (max-width: $MQMobile)
    padding-left 1.5rem
    padding-right 1.5rem

  .blog-page-wrapper
    display flex
    align-items flex-start
    margin 0 auto

    @media (min-width: $MQMobile)
      padding 0 1rem

    @media (min-width: $MQNarrow)
      padding 0 2rem

    @media (min-width: $MQWide)
      padding 0

    .blogger-info-wrapper
      position sticky
      box-sizing border-box
      top ($navbarHeight + 1rem)
      flex 0 0 300px
      height auto
      margin-bottom 12px
      transition all 0.3s

      @media (max-width: $MQMobile)
        display none !important

      @media (min-width: $MQWide)
        flex-basis 360px

      .blogger-info
        margin-bottom 16px
        padding 8px 0
        border-radius 8px
        box-shadow 0 2px 8px 0 var(--card-shadow-color)

        &:hover
          box-shadow 0 4px 16px 0 var(--card-shadow-color)

      .article-wrapper, .category-wrapper, .tag-wrapper
        margin 16px 0
        padding 8px 16px
        border-radius 8px
        box-shadow 0 2px 8px 0 var(--card-shadow-color)

        @media (min-width: $MQWide)
          border-top-left-radius 0
          border-bottom-left-radius 0

        &:hover
          box-shadow 0 4px 16px 0 var(--card-shadow-color)

        .title
          cursor pointer

          .icon
            position relative
            bottom -0.125rem
            width 16px
            height 16px
            margin 0 6px

          .num
            position relative
            top -0.25rem
            margin 0 2px
            font-size 24px

      .article-wrapper
        .sticky-article-list
          margin 8px auto

          .sticky-article
            padding 12px 8px 4px
            border-bottom 1px dashed var(--grey12)

            &:hover
              color var(--accent-color)

      .category-wrapper
        .category-list-wrapper
          margin 8px auto

      .tag-wrapper
        .tag-list-wrapper
          margin 8px auto

      .timeline-wrapper
        @media (min-width: $MQNormal)
          display none

        @media (min-width: $MQWide)
          border-top-left-radius 0
          border-bottom-left-radius 0

    .blog-list-wrapper
      flex auto

      @media (min-width: $MQMobile)
        margin 0 15px

      .blog-list
        max-width 780px
        margin 0 auto

    .blog-detail-wrapper
      position sticky
      top ($navbarHeight + 1rem)
      flex 0 0 300px

      @media (max-width: $MQNormal)
        display none

      .timeline-wrapper
        margin-top 0

        @media (min-width: $MQWide)
          border-top-right-radius 0
          border-bottom-right-radius 0
</style>
