import Vue from "vue";
import { filterArticle, sortArticle } from "@theme/utils/article";

import type { PageComputed } from "@mr-hope/vuepress-types";

export const starMixin = Vue.extend({
  computed: {
    $starArticles(): PageComputed[] {
      const { pages } = this.$site;

      // filter before sort
      return sortArticle(
        filterArticle(pages, (page) => Boolean(page.frontmatter.star)),
        "star"
      );
    },
  },
});
