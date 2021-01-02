import Vue from "vue";
import TimeIcon from "./icons/TimeIcon.vue";
import { pageInfoI18n, readingTimeI18n } from "./define";

export default Vue.extend({
  name: "ReadtimeInfo",

  components: { TimeIcon },

  computed: {
    readtime(): string {
      const minute = readingTimeI18n[this.$localePath || "/"].minute;
      const time = readingTimeI18n[this.$localePath || "/"].time;

      return this.$page.readingTime.minutes < 1
        ? minute
        : time.replace(
            "$time",
            Math.round(this.$page.readingTime.minutes).toString()
          );
    },

    hint(): string {
      return pageInfoI18n[this.$localePath || "/"].readingTime;
    },
  },
});
