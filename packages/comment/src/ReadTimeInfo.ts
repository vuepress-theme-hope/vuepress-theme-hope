import { Component, Vue } from "vue-property-decorator";
import TimeIcon from "@mr-hope/vuepress-shared-utils/icons/TimeIcon.vue";
import { pageInfoI18n, readingTimeI18n } from "./define";

@Component({ components: { TimeIcon } })
export default class ReadTimeInfo extends Vue {
  private get readtime(): string {
    const minute = readingTimeI18n[this.$localePath || "/"].minute;
    const time = readingTimeI18n[this.$localePath || "/"].time;

    return this.$page.readingTime.minutes < 1
      ? minute
      : time.replace(
          "$time",
          Math.round(this.$page.readingTime.minutes).toString()
        );
  }

  private get hint(): string {
    return pageInfoI18n[this.$localePath || "/"].readingTime;
  }
}
