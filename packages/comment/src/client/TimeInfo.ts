import Vue from "vue";
import CalendarIcon from "./icons/CalendarIcon.vue";
import { pageInfoI18n } from "./define";

export default Vue.extend({
  name: "TimeInfo",

  components: { CalendarIcon },

  computed: {
    time(): string {
      const { date, time = date } = this.$frontmatter;

      if (typeof time === "string") {
        if (time.indexOf("T") !== -1) {
          const [date, temp] = time.split("T");
          const [moment] = temp.split(".");

          return `${date} ${moment === "00:00:00" ? "" : moment}`;
        }

        return time;
      }

      const { createTimeStamp } = this.$page;

      if (createTimeStamp) {
        const date = new Date(createTimeStamp);

        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      }

      return "";
    },

    hint(): string {
      return pageInfoI18n[this.$localePath || "/"].time;
    },
  },
});
