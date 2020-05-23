import { Component, Vue } from "vue-property-decorator";
import { filterArticle, getDate, sortArticle } from "./article";
import { PageComputed } from "@mr-hope/vuepress-types";

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
    return sortArticle(
      filterArticle(
        pages,
        (frontmatter) =>
          (frontmatter.time || frontmatter.date) &&
          frontmatter.timeline !== false
      )
    );
  }

  /** 时间轴列表 */
  protected get $timeline(): TimelineItem[] {
    const timelineItems: TimelineItem[] = [];

    // 先过滤再排序
    this.$timelineItems.forEach((article) => {
      const {
        frontmatter: { date, time = date as Date },
      } = article;
      const [year, month, day] = getDate(time);

      if (year && month && day) {
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
    return sortArticle(
      filterArticle(pages, (frontmatter) => Boolean(frontmatter.sticky))
    );
  }
}
