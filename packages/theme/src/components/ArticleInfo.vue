<template>
  <div v-if="author || time" class="article-info">
    <!-- 作者 -->
    <span v-if="author">
      <AuthorIcon />
      <span v-text="author" />
    </span>

    <!-- 时间 -->
    <span v-if="time" class="time">
      <CalendarIcon />
      <span v-text="time" />
    </span>

    <CategoryInfo v-if="article.frontmatter.category" :category="article.frontmatter.category" />

    <TagInfo v-if="tags.length !== 0" :tags="tags" />

    <!-- 阅读时间 -->
    <span v-if="readtime" class="read-time-info">
      <TimeIcon />
      <span v-text="readtime" />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  HopeLangI18nConfig,
  capitalize,
  i18n,
} from "@mr-hope/vuepress-shared-utils";
import AuthorIcon from "@mr-hope/vuepress-shared-utils/icons/AuthorIcon.vue";
import CalendarIcon from "@mr-hope/vuepress-shared-utils/icons/CalendarIcon.vue";
import CategoryInfo from "@mr-hope/vuepress-plugin-comment/src/CategoryInfo.vue";
import { PageComputed } from "@mr-hope/vuepress-types";
import TagInfo from "@mr-hope/vuepress-plugin-comment/src/TagInfo.vue";
import TimeIcon from "@mr-hope/vuepress-shared-utils/icons/TimeIcon.vue";
import moment = require("moment");
import navigate from "@theme/util/navigate";

@Component({
  components: {
    AuthorIcon,
    CalendarIcon,
    CategoryInfo,
    TagInfo,
    TimeIcon,
  },
})
export default class ArticleInfo extends Vue {
  @Prop(Object) private readonly article!: PageComputed;

  /** 作者 */
  private get author() {
    return (
      this.article.frontmatter.author ||
      (this.$themeConfig.author && this.article.frontmatter.author !== false
        ? this.$themeConfig.author
        : "")
    );
  }

  /** 发表时间 */
  private get time() {
    const { date, time = date } = this.article.frontmatter;

    if (time) {
      if (time.indexOf("T") !== -1) {
        const [dateString, temp] = time.split("T");
        const [times] = temp.split(".");

        return `${dateString} ${times === "00:00:00" ? "" : times}`;
      }

      return time;
    }

    return "";
  }

  /** 标签 */
  private get tags() {
    const { tag, tags = tag } = this.article.frontmatter;

    if (typeof tags === "string") return [capitalize(tags)];

    if (Array.isArray(tags)) return tags.map((item) => capitalize(item));

    return [];
  }

  private get readtime() {
    const { readingTime } =
      (this.$themeLocaleConfig as HopeLangI18nConfig) ||
      i18n.getDefaultLocale();

    return this.article.readingTime.minutes < 1
      ? readingTime.minute
      : readingTime.time.replace(
          "$time",
          Math.round(this.article.readingTime.minutes).toString(),
        );
  }
}
</script>

<style lang="stylus">
.article-info
  display flex
  align-items center
  font-size 15px
  color var(--dark-grey)
  flex-wrap wrap
  justify-content flex-start
  align-content stretch
  font-size 14px

  .icon
    width 16px
    height 16px
    margin-right 4px

  & > span
    display flex
    align-items center
    margin-right 8px

    &.category:hover
      cursor pointer
</style>
