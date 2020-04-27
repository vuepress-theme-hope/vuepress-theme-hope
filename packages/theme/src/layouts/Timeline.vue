<template>
  <Common class="timeline-wrapper" :sidebar="false">
    <ul class="timeline-content">
      <ModuleTransition>
        <li class="desc">{{hint}}</li>
      </ModuleTransition>
      <ModuleTransition
        v-for="(item, index) in timelineItems"
        :key="index"
        :delay="0.08 * (index + 1)"
      >
        <li>
          <h3 class="year">{{item.year}}</h3>
          <ul class="year-wrapper">
            <li v-for="(article, articleIndex) in item.articles" :key="articleIndex">
              <span class="date">{{article.frontmatter.parsedDate}}</span>
              <span class="title" @click="navigate(article.path)">{{article.title}}</span>
            </li>
          </ul>
        </li>
      </ModuleTransition>
    </ul>
  </Common>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { deepAssign, i18n } from '@mr-hope/vuepress-shared-utils';
import { filterArticle, getDate, sortArticle } from '@theme/util/article';
import Common from '@theme/layouts/Common.vue';
import ModuleTransition from '@theme/components/ModuleTransition.vue';
import { PageComputed } from 'vuepress-types';

interface TimelineItem {
  year: number;
  articles: PageComputed[];
}

const hintConfig = {};

@Component({ components: { Common, ModuleTransition } })
export default class Timeline extends Vue {
  /** 提示文字 */
  private get hint() {
    return (
      this.$themeConfig.blog.timeline ||
      this.$themeLocaleConfig.blog.timelineText ||
      i18n.getDefaultLocale().blog.timelineText
    );
  }

  /** 时间轴列表 */
  private get timelineItems(): TimelineItem[] {
    const { pages } = this.$site;
    const timelineItems: TimelineItem[] = [];

    // 先过滤再排序
    sortArticle(
      filterArticle(
        pages.map((page) => deepAssign({}, page) as PageComputed),
        true
      )
    ).forEach((article) => {
      const {
        frontmatter: { date, time = date }
      } = article;
      const [year, month, day] = getDate(time);

      if (year) {
        if (!timelineItems[0] || timelineItems[0].year !== year)
          timelineItems.unshift({ year, articles: [] });

        article.frontmatter.parsedDate = `${month}-${day}`;
        timelineItems[0].articles.push(article);
      }
    });

    return timelineItems.reverse();
  }

  private navigate(url: string) {
    this.$router.push(url);
  }
}
</script>

<style lang="stylus">
.timeline-wrapper
  max-width 740px
  margin 0 auto
  padding 4.6rem 2.5rem 0

  .timeline-content
    box-sizing border-box
    position relative
    list-style none

    &::after
      content ' '
      position absolute
      top 14px
      left 0
      z-index -1
      margin-left -2px
      width 4px
      height 100%
      background var(--border-color)

    .desc
      position relative
      color var(--text-color)
      font-size 18px

      @media (min-width: $MQNormal)
        font-size 20px

    .year
      position relative
      color var(--text-color)
      font-size 16px

      &:before
        content ' '
        position absolute
        z-index 2
        left -20px
        top 50%
        margin-left -4px
        margin-top -4px
        width 8px
        height 8px
        background var(--background-color)
        border 1px solid var(--border-color)
        border-radius 50%

    .year
      margin 80px 0 0px
      color var(--text-color)
      font-weight 700
      font-size 26px

    .year-wrapper
      padding-left 0 !important

      li
        display flex
        padding 30px 0 10px
        list-style none
        border-bottom 1px dashed var(--border-color)
        position relative

        &:hover
          .date
            color var(--accent-color)

            &::before
              background var(--accent-color)

          .title
            color var(--accent-color)

        .date
          width 40px
          line-height 30px
          color var(--text-color-sub)
          font-size 12px

          &::before
            content ' '
            position absolute
            left -19px
            top 41px
            width 6px
            height 6px
            margin-left -4px
            background var(--background-color)
            border-radius 50%
            border 1px solid var(--border-color)
            z-index 2

        .title
          line-height 30px
          color var(--text-color-sub)
          font-size 16px
          cursor pointer

@media (max-width: $MQMobile)
  .timeline-wrapper
    margin 0 1.2rem
</style>D