<template>
  <aside class="blog-info-wrapper">
    <MyTransition>
      <BloggerInfo />
    </MyTransition>

    <!-- 文章 -->
    <MyTransition :delay="0.04">
      <div class="sticky-article-wrapper">
        <div class="title" @click="$router.push('/article/')">
          <ArticleIconFill />
          <span class="num">{{$articles.length}}</span>
          {{i18n.article}}
        </div>
        <hr />
        <ul class="sticky-article-list">
          <MyTransition
            v-for="(article,index) in $stickArticles"
            :key="article.path"
            :delay="(index + 1) * 0.08"
          >
            <li class="sticky-article" @click="$router.push(article.path)" v-text="article.title" />
          </MyTransition>
        </ul>
      </div>
    </MyTransition>

    <!-- 分类 -->
    <MyTransition :delay="0.12">
      <div class="category-wrapper">
        <div v-if="$category.list.length !== 0" class="title" @click="$router.push('/category/')">
          <CategoryIcon />
          <span class="num">{{$category.list.length}}</span>
          {{i18n.category}}
        </div>
        <hr />
        <MyTransition :delay="0.16">
          <CategoryList />
        </MyTransition>
      </div>
    </MyTransition>

    <!-- 标签 -->
    <MyTransition :delay="0.20">
      <div class="tag-wrapper">
        <div v-if="$tag.list.length !== 0" class="title" @click="$router.push('/tag/')">
          <TagIcon />
          <span class="num">{{$tag.list.length}}</span>
          {{i18n.tag}}
        </div>
        <hr />
        <MyTransition :delay="0.24">
          <TagList />
        </MyTransition>
      </div>
    </MyTransition>

    <MyTransition :delay="0.28">
      <TimelineList />
    </MyTransition>
  </aside>
</template>

<script lang='ts'>
import { ArticleMixin, StickyMixin } from "../util/articleMixin";
import { Component, Mixins, Vue } from "vue-property-decorator";
import { capitalize, i18n } from "@mr-hope/vuepress-shared-utils";
import ArticleIconFill from "@mr-hope/vuepress-shared-utils/icons/ArticleIconFill.vue";
import ArticleList from "@theme/components/ArticleList.vue";
import BloggerInfo from "@theme/components/BloggerInfo.vue";
import CategoryIcon from "@mr-hope/vuepress-shared-utils/icons/CategoryIcon.vue";
import CategoryList from "@theme/components/CategoryList.vue";
import MyTransition from "@theme/components/MyTransition.vue";
import TagIcon from "@mr-hope/vuepress-shared-utils/icons/TagIcon.vue";
import TagList from "@theme/components/TagList.vue";
import Timeline from "@theme/components/Timeline.vue";
import TimelineList from "@theme/components/TimelineList.vue";

@Component({
  components: {
    ArticleIconFill,
    ArticleList,
    BloggerInfo,
    CategoryIcon,
    CategoryList,
    MyTransition,
    TagIcon,
    TagList,
    Timeline,
    TimelineList,
  },
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
        margin 0 2px
        font-size 22px

  .sticky-article-wrapper
    .sticky-article-list
      margin 8px auto

      .sticky-article
        padding 12px 8px 4px
        border-bottom 1px dashed var(--grey14)

        &:hover
          cursor pointer
          color var(--accent-color)

  .category-wrapper
    .category-list-wrapper
      margin 8px auto

  .tag-wrapper
    .tag-list-wrapper
      margin 8px auto

  .sidebar &
    .blogger-info-wrapper
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

    .blogger-info-wrapper
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