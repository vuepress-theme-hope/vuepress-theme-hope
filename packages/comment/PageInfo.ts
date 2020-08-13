/* eslint-disable @typescript-eslint/naming-convention */
/* global COMMENT_OPTIONS */
import { i18n } from "@mr-hope/vuepress-shared-utils";
import { Component, Vue } from "vue-property-decorator";
import { PageInfotype } from "./types";
import AuthorInfo from "./src/AuthorInfo.vue";
import CategoryInfo from "./src/CategoryInfo.vue";
import ReadTimeInfo from "./src/ReadTimeInfo.vue";
import TagInfo from "./src/TagInfo.vue";
import TimeInfo from "./src/TimeInfo.vue";
import VisitorInfo from "./src/VisitorInfo.vue";
import WordInfo from "./src/WordInfo.vue";

@Component({
  components: {
    AuthorInfo,
    CategoryInfo,
    ReadTimeInfo,
    TagInfo,
    TimeInfo,
    VisitorInfo,
    WordInfo,
  },
})
export default class PageInfo extends Vue {
  private commentConfig = COMMENT_OPTIONS;

  private get config(): PageInfotype[] | false {
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
  }

  private get iconPrefix(): string {
    const { iconPrefix } = this.$themeConfig;

    return iconPrefix === "" ? "" : iconPrefix || "icon-";
  }

  private get isOriginal(): boolean {
    return this.$frontmatter.original === true;
  }

  private get originText(): string {
    return (this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog)
      .origin;
  }
}
