import { Component, Vue } from "vue-property-decorator";
import TimeIcon from "@mr-hope/vuepress-shared-utils/icons/TimeIcon.vue";

@Component({ components: { TimeIcon } })
export default class ReadTimeInfo extends Vue {
  private get readtime(): string {
    const minute = READING_TIME_I18N.minute[this.$localePath || "/"];
    const time = READING_TIME_I18N.time[this.$localePath || "/"];

    return this.$page.readingTime.minutes < 1
      ? minute
      : time.replace(
          "$time",
          Math.round(this.$page.readingTime.minutes).toString()
        );
  }

  private get hint(): string {
    return PAGE_INFO_I18N.readingTime[this.$localePath || "/"];
  }
}
