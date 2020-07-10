/* eslint-disable @typescript-eslint/naming-convention */
import { ArticleMixin, StickyMixin } from "@theme/util/articleMixin";
import { Component, Mixins } from "vue-property-decorator";
import { HopeLangI18nConfig, i18n } from "@mr-hope/vuepress-shared-utils";
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
  private get i18n(): HopeLangI18nConfig["blog"] {
    return this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog;
  }
}
