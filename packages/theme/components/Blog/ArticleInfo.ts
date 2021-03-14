import Vue from "vue";
import { capitalize } from "@mr-hope/vuepress-shared";
import AuthorIcon from "@mr-hope/vuepress-plugin-comment/lib/client/icons/AuthorIcon.vue";
import CalendarIcon from "@mr-hope/vuepress-plugin-comment/lib/client/icons/CalendarIcon.vue";
import CategoryInfo from "@mr-hope/vuepress-plugin-comment/lib/client/CategoryInfo.vue";
import TagInfo from "@mr-hope/vuepress-plugin-comment/lib/client/TagInfo.vue";
import TimerIcon from "@mr-hope/vuepress-plugin-comment/lib/client/icons/TimerIcon.vue";

import type { PageComputed } from "@mr-hope/vuepress-types";
import type { PropType } from "vue";

export default Vue.extend({
  name: "ArticleInfo",

  components: {
    AuthorIcon,
    CalendarIcon,
    CategoryInfo,
    TagInfo,
    TimerIcon,
  },

  props: {
    article: { type: Object as PropType<PageComputed>, required: true },
  },

  computed: {
    author(): string {
      return (
        this.article.frontmatter.author ||
        (this.$themeConfig.author && this.article.frontmatter.author !== false
          ? this.$themeConfig.author
          : "")
      );
    },

    time(): string {
      const { date, time = date } = this.article.frontmatter;

      if (typeof time === "string") {
        if (time.indexOf("T") !== -1) {
          const [dateString, temp] = time.split("T");
          const [times] = temp.split(".");

          return `${dateString} ${times === "00:00:00" ? "" : times}`;
        }

        return time;
      }

      return this.article.createTime || "";
    },

    tags(): string[] {
      const { tag, tags = tag } = this.article.frontmatter;

      if (typeof tags === "string") return [capitalize(tags)];

      if (Array.isArray(tags)) return tags.map((item) => capitalize(item));

      return [];
    },

    readingTimeContent(): string {
      return `PT${Math.max(Math.round(this.$page.readingTime.minutes), 1)}M`;
    },

    readingTime(): string {
      const { minute, time } = READING_TIME_I18N[this.$localePath || "/"];

      return this.article.readingTime.minutes < 1
        ? minute
        : time.replace(
            "$time",
            Math.round(this.article.readingTime.minutes).toString()
          );
    },

    authorText(): string {
      return PAGE_INFO_I18N[this.$localePath || "/"].author;
    },

    timeText(): string {
      return PAGE_INFO_I18N[this.$localePath || "/"].time;
    },

    tagText(): string {
      return PAGE_INFO_I18N[this.$localePath || "/"].tag;
    },

    readingTimeText(): string {
      return PAGE_INFO_I18N[this.$localePath || "/"].readingTime;
    },
  },
});
