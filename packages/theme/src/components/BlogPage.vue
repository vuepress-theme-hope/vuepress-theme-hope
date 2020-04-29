<template>
  <div class="page blog">
    <div class="blog-page-wrapper">
      <ModuleTransition>
        <BlogInfo class="in-page" />
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
import { capitalize, i18n } from '@mr-hope/vuepress-shared-utils';
import ArticleList from '@theme/components/ArticleList.vue';
import BlogHero from '@theme/components/BlogHero.vue';
import BlogInfo from '@theme/components/BlogInfo.vue';
import ModuleTransition from '@theme/components/ModuleTransition.vue';
import PageFooter from '@theme/components/PageFooter.vue';
import Password from '@theme/components/Password.vue';
import Timeline from '@theme/components/Timeline.vue';
import TimelineList from '@theme/components/TimelineList.vue';

@Component({
  components: {
    ArticleList,
    BlogHero,
    BlogInfo,
    ModuleTransition,
    PageFooter,
    Password,
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
