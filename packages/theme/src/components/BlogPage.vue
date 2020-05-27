<template>
  <div class="page blog">
    <div class="blog-page-wrapper">
      <MyTransition>
        <BlogInfo />
      </MyTransition>

      <div class="blog-list-wrapper">
        <main class="blog-list">
          <MyTransition :delay="0.08">
            <component :is="componentName" v-if="componentName" />
            <BlogHero v-else-if="$frontmatter.home" />
            <h1 v-else>{{i18n.articleList}}</h1>
          </MyTransition>

          <MyTransition :delay="0.20">
            <ProjectList v-if="$frontmatter.home" />
          </MyTransition>

          <!-- 文章列表 -->
          <MyTransition :delay="0.24">
            <ArticleList v-if="displayArticles" :key="$route.path" />
          </MyTransition>
        </main>
      </div>

      <div class="blog-detail-wrapper">
        <MyTransition :delay="0.28">
          <TimelineList />
        </MyTransition>
      </div>
    </div>

    <!-- Markdown 内容 -->
    <MyTransition :delay="0.28">
      <Content :key="$route.path" class="home-center" custom />
    </MyTransition>

    <!-- 页脚 -->
    <MyTransition :delay="0.32">
      <PageFooter :key="$route.path" />
    </MyTransition>
  </div>
</template>

<script lang='ts'>
import { ArticleMixin, StickyMixin } from "../util/articleMixin";
import { Component, Mixins, Vue } from "vue-property-decorator";
import ArticleList from "@theme/components/ArticleList.vue";
import BlogHero from "@theme/components/BlogHero.vue";
import BlogInfo from "@BlogInfo";
import CategoryList from "@theme/components/CategoryList.vue";
import MyTransition from "@theme/components/MyTransition.vue";
import PageFooter from "@theme/components/PageFooter.vue";
import Password from "@theme/components/Password.vue";
import ProjectList from "@theme/components/ProjectList.vue";
import TagList from "@theme/components/TagList.vue";
import Timeline from "@theme/components/Timeline.vue";
import TimelineList from "@theme/components/TimelineList.vue";
import { i18n } from "@mr-hope/vuepress-shared-utils";

@Component({
  components: {
    ArticleList,
    BlogHero,
    BlogInfo,
    CategoryList,
    MyTransition,
    PageFooter,
    Password,
    ProjectList,
    TagList,
    Timeline,
    TimelineList,
  },
})
export default class BlogPage extends Mixins(ArticleMixin, StickyMixin) {
  private get i18n() {
    return this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog;
  }

  private heroHeight() {
    return (document.querySelector(".blog-hero") as Element).clientHeight;
  }

  /** 是否显示文章 */
  private get displayArticles() {
    const { path } = this.$route;

    return !path.includes("/timeline");
  }

  /** 组件名称 */
  private get componentName() {
    const pathName = this.$route.path.split("/")[1];

    if (["category", "tag"].includes(pathName)) return `${pathName}List`;
    else if (pathName === "timeline") return pathName;

    return "";
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
      margin-bottom 12px

      @media (max-width: $MQNormal)
        display none

      .timeline-wrapper
        margin-top 0

        @media (min-width: $MQWide)
          border-top-right-radius 0
          border-bottom-right-radius 0
</style>
