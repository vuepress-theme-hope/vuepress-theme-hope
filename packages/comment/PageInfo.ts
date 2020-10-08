/* global COMMENT_OPTIONS */
import { defineComponent, ref } from "@vue/composition-api";
import { i18n } from "@mr-hope/vuepress-shared-utils";

import AuthorInfo from "./src/AuthorInfo.vue";
import CategoryInfo from "./src/CategoryInfo.vue";
import ReadTimeInfo from "./src/ReadTimeInfo.vue";
import TagInfo from "./src/TagInfo.vue";
import TimeInfo from "./src/TimeInfo.vue";
import VisitorInfo from "./src/VisitorInfo.vue";
import WordInfo from "./src/WordInfo.vue";

import { PageInfotype } from "./types";

export default defineComponent({
  name: "PageInfo",

  components: {
    AuthorInfo,
    CategoryInfo,
    ReadTimeInfo,
    TagInfo,
    TimeInfo,
    VisitorInfo,
    WordInfo,
  },

  setup() {
    const commentConfig = ref(COMMENT_OPTIONS);

    return { commentConfig };
  },

  computed: {
    config(): PageInfotype[] | false {
      const themeConfig = this.$themeConfig.pageInfo;
      const pluginConfig = this.commentConfig.pageInfo;
      const pageConfig = this.$page.frontmatter.pageInfo as
        | false
        | PageInfotype[]
        | undefined;

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
        : ["Author", "Visitor", "Time", "Category", "Tag", "ReadTime"];
    },

    iconPrefix(): string {
      const { iconPrefix } = this.$themeConfig;

      return iconPrefix === "" ? "" : iconPrefix || "icon-";
    },

    isOriginal(): boolean {
      return this.$frontmatter.original === true;
    },

    originText(): string {
      return (this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog)
        .origin;
    },
  },
});
