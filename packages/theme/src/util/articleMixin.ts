/* eslint-disable max-classes-per-file */
import { Component, Vue } from 'vue-property-decorator';
import {
  filterArticle,
  filterStickyArticle,
  filterTimelineArticle,
  getDate,
  sortArticle
} from './article';
import { PageComputed } from 'vuepress-types';

export interface TimelineItem {
  year: number;
  articles: PageComputed[];
}

@Component
export class ArticleMixin extends Vue {
  /** 文章列表 */
  protected get $articles(): PageComputed[] {
    const { pages } = this.$site;

    // 先过滤再排序
    return sortArticle(filterArticle(pages));
  }
}

@Component
export class TimelineMixin extends Vue {
  /** 时间轴项目 */
  protected get $timelineItems(): PageComputed[] {
    const { pages } = this.$site;

    // 先过滤再排序
    return sortArticle(filterTimelineArticle(pages));
  }

  /** 时间轴列表 */
  protected get $timeline(): TimelineItem[] {
    const timelineItems: TimelineItem[] = [];

    // 先过滤再排序
    this.$timelineItems.forEach((article) => {
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
}

@Component
export class StickyMixin extends Vue {
  /** 文章列表 */
  protected get $stickArticles(): PageComputed[] {
    const { pages } = this.$site;

    // 先过滤再排序
    return sortArticle(filterStickyArticle(pages));
  }
}
