import Vue from "vue";
import { filterArticle, getDate, sortArticle } from "@theme/utils/article";

import type { PageComputed } from "@mr-hope/vuepress-types";

export interface TimelineItem {
  year: number;
  articles: PageComputed[];
}

export const timelineMixin = Vue.extend({
  computed: {
    $timelineItems(): PageComputed[] {
      const { pages } = this.$site;

      // filter before sort
      return sortArticle(
        filterArticle(
          pages,
          (page) =>
            Boolean(
              page.frontmatter.time ||
                page.frontmatter.date ||
                page.createTimeStamp
            ) && page.frontmatter.timeline !== false
        )
      );
    },

    /** Timeline list */
    $timeline(): TimelineItem[] {
      const timelineItems: TimelineItem[] = [];

      // filter before sort
      this.$timelineItems.forEach((article) => {
        const {
          frontmatter: { date, time = date },
          createTimeStamp,
        } = article;
        const [year, month, day] = getDate(
          (time || createTimeStamp) as string | number | Date
        );

        if (year && month && day) {
          if (!timelineItems[0] || timelineItems[0].year !== year)
            timelineItems.unshift({ year, articles: [] });

          article.frontmatter.parsedDate = `${month}/${day}`;
          timelineItems[0].articles.push(article);
        }
      });

      return timelineItems.reverse();
    },
  },
});
