<template>
  <div class="blog-info-wrapper">
    <ModuleTransition>
      <BloggerInfo />
    </ModuleTransition>

    <!-- 文章 -->
    <ModuleTransition :delay="0.04">
      <div class="sticky-article-wrapper">
        <div class="title" @click="$router.push('/article/')">
          <ArticleIcon />
          <span class="num">{{$articles.length}}</span>
          {{i18n.article}}
        </div>
        <hr />
        <div class="sticky-article-list">
          <ModuleTransition
            v-for="(article,index) in $stickArticles"
            :key="article.url"
            :delay="(index + 1) * 0.08"
          >
            <li class="sticky-article" @click="$router.push(article.url)" v-text="article.title" />
          </ModuleTransition>
        </div>
      </div>
    </ModuleTransition>

    <!-- 分类 -->
    <ModuleTransition :delay="0.12">
      <div class="category-wrapper">
        <div v-if="$category.list.length !== 0" class="title" @click="$router.push('/category/')">
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
</template>

<script lang='ts'>
import { ArticleMixin, StickyMixin } from '@theme/util/articleMixin';
import { Component, Mixins, Vue } from 'vue-property-decorator';
import { capitalize, i18n } from '@mr-hope/vuepress-shared-utils';
import ArticleIcon from '@mr-hope/vuepress-shared-utils/icons/ArticleIcon.vue';
import ArticleList from '@theme/components/ArticleList.vue';
import BloggerInfo from '@theme/components/BloggerInfo.vue';
import CategoryIcon from '@mr-hope/vuepress-shared-utils/icons/CategoryIcon.vue';
import CategoryList from '@theme/components/CategoryList.vue';
import ModuleTransition from '@theme/components/ModuleTransition.vue';
import TagIcon from '@mr-hope/vuepress-shared-utils/icons/TagIcon.vue';
import TagList from '@theme/components/TagList.vue';
import Timeline from '@theme/components/Timeline.vue';
import TimelineList from '@theme/components/TimelineList.vue';

@Component({
  components: {
    ArticleIcon,
    ArticleList,
    BloggerInfo,
    CategoryIcon,
    CategoryList,
    ModuleTransition,
    TagIcon,
    TagList,
    Timeline,
    TimelineList
  }
})
export default class BlogInfo extends Mixins(ArticleMixin, StickyMixin) {
  private get i18n() {
    return this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog;
  }
}
</script>

<style lang="stylus">
.blog-info-wrapper
  .sticky-article-wrapper, .category-wrapper, .tag-wrapper
    padding 8px 16px

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

  .sticky-article-wrapper
    .sticky-article-list
      margin 8px auto

      .sticky-article
        padding 12px 8px 4px
        border-bottom 1px dashed var(--grey14)

        &:hover
          color var(--accent-color)

  .category-wrapper
    .category-list-wrapper
      margin 8px auto

  .tag-wrapper
    .tag-list-wrapper
      margin 8px auto

  .sidebar &
    .blogger-info
      display none

  .page &
    position sticky
    box-sizing border-box
    top ($navbarHeight + 1rem)
    flex 0 0 300px
    height auto
    margin-bottom 12px
    transition all 0.3s

    @media (max-width: $MQMobile)
      display none

    @media (min-width: $MQWide)
      flex-basis 360px

    .blogger-info
      margin-bottom 16px
      padding 8px 0
      border-radius 8px
      box-shadow 0 2px 8px 0 var(--card-shadow-color)

      &:hover
        box-shadow 0 4px 16px 0 var(--card-shadow-color)

    .sticky-article-wrapper, .category-wrapper, .tag-wrapper
      margin 16px 0
      border-radius 8px
      box-shadow 0 2px 8px 0 var(--card-shadow-color)

      @media (min-width: $MQWide)
        border-top-left-radius 0
        border-bottom-left-radius 0

      &:hover
        box-shadow 0 4px 16px 0 var(--card-shadow-color)

    .timeline-list-wrapper
      @media (min-width: $MQNormal)
        display none

      @media (min-width: $MQWide)
        border-top-left-radius 0
        border-bottom-left-radius 0

      .content
        max-height 40vh
</style>