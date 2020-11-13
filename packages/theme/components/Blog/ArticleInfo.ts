import { Component, Prop, Vue } from "vue-property-decorator";
import { capitalize } from "@mr-hope/vuepress-shared-utils";
import AuthorIcon from "@mr-hope/vuepress-shared-utils/icons/AuthorIcon.vue";
import CalendarIcon from "@mr-hope/vuepress-shared-utils/icons/CalendarIcon.vue";
import CategoryInfo from "@mr-hope/vuepress-plugin-comment/src/CategoryInfo.vue";
import { PageComputed } from "@mr-hope/vuepress-types";
import TagInfo from "@mr-hope/vuepress-plugin-comment/src/TagInfo.vue";
import TimeIcon from "@mr-hope/vuepress-shared-utils/icons/TimeIcon.vue";

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

  private get author(): string {
    return (
      (this.article.frontmatter.author as string | false | undefined) ||
      (this.$themeConfig.author && this.article.frontmatter.author !== false
        ? this.$themeConfig.author
        : "")
    );
  }

  private get time(): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { date, time = date } = this.article.frontmatter;

    if (typeof time === "string") {
      if (time.indexOf("T") !== -1) {
        const [dateString, temp] = time.split("T");
        const [times] = temp.split(".");

        return `${dateString} ${times === "00:00:00" ? "" : times}`;
      }

      return time;
    }

    return "";
  }

  private get tags(): string[] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { tag, tags = tag } = this.article.frontmatter;

    if (typeof tags === "string") return [capitalize(tags)];

    if (Array.isArray(tags)) return tags.map((item) => capitalize(item));

    return [];
  }

  private get readtime(): string {
    const { minute, time } = READING_TIME_I18N[this.$localePath || "/"];

    return this.article.readingTime.minutes < 1
      ? minute
      : time.replace(
          "$time",
          Math.round(this.article.readingTime.minutes).toString()
        );
  }

  private get authorText(): string {
    return PAGE_INFO_I18N[this.$localePath || "/"].author;
  }

  private get timeText(): string {
    return PAGE_INFO_I18N[this.$localePath || "/"].time;
  }

  private get tagText(): string {
    return PAGE_INFO_I18N[this.$localePath || "/"].tag;
  }

  private get readingTimeText(): string {
    return PAGE_INFO_I18N[this.$localePath || "/"].readingTime;
  }
}
