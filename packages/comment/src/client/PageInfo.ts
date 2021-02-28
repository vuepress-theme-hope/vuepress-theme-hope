import Vue from "vue";
import { PageInfotype } from "../types";
import AuthorInfo from "./AuthorInfo.vue";
import CategoryInfo from "./CategoryInfo.vue";
import ReadingTimeInfo from "./ReadingTimeInfo.vue";
import TagInfo from "./TagInfo.vue";
import TimeInfo from "./TimeInfo.vue";
import VisitorInfo from "./VisitorInfo.vue";
import WordInfo from "./WordInfo.vue";
import { commentOptions, pageInfoI18n } from "./define";

import "balloon-css";

export default Vue.extend({
  name: "PageInfo",

  components: {
    AuthorInfo,
    CategoryInfo,
    ReadingTimeInfo,
    TagInfo,
    TimeInfo,
    VisitorInfo,
    WordInfo,
  },

  data: () => ({
    commentConfig: commentOptions,
  }),

  computed: {
    config(): PageInfotype[] | false {
      const themeConfig = this.$themeConfig.pageInfo;
      const pluginConfig = this.commentConfig.pageInfo;
      const pageConfig = this.$page.frontmatter.pageInfo;

      return pageConfig === false
        ? false
        : Array.isArray(pageConfig)
        ? pageConfig
        : pluginConfig === false
        ? false
        : Array.isArray(pluginConfig)
        ? pluginConfig
        : themeConfig === false
        ? false
        : Array.isArray(themeConfig)
        ? themeConfig
        : ["author", "visitor", "time", "category", "tag", "reading-time"];
    },
    iconPrefix(): string {
      const { iconPrefix } = this.$themeConfig;

      return iconPrefix === "" ? "" : iconPrefix || "icon-";
    },
    isOriginal(): boolean {
      return this.$frontmatter.original === true;
    },
    originText(): string {
      return pageInfoI18n[this.$localePath || "/"].origin;
    },
  },
});
