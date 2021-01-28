import { Component, Vue } from "vue-property-decorator";
import { filterArticle, getDate, sortArticle } from "./article";

import type { PageComputed } from "@mr-hope/vuepress-types";

export interface TimelineItem {
  year: number;
  articles: PageComputed[];
}

@Component
export class TimelineMixin extends Vue {
  protected get $timelineItems(): PageComputed[] {
    const { pages } = this.$site;

    // filter before sort
    return sortArticle(
      filterArticle(
        pages,
        (page) =>
          Boolean(page.frontmatter.time || page.frontmatter.date) &&
          page.frontmatter.timeline !== false
      )
    );
  }

  /** Timeline list */
  protected get $timeline(): TimelineItem[] {
    const timelineItems: TimelineItem[] = [];

    // filter before sort
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
  protected get $stickArticles(): PageComputed[] {
    const { pages } = this.$site;

    // filter before sort
    return sortArticle(
      filterArticle(pages, (page) => Boolean(page.frontmatter.sticky))
    );
  }
}
