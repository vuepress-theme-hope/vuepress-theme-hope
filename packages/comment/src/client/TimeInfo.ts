import Vue from "vue";
import CalendarIcon from "./icons/CalendarIcon.vue";
import { pageInfoI18n } from "./define";

export default Vue.extend({
  name: "TimeInfo",

  components: { CalendarIcon },

  computed: {
    time(): string {
      const { time } = this.$frontmatter;

      if (typeof time === "string") {
        if (time.indexOf("T") !== -1) {
          const [date, temp] = time.split("T");
          const [moment] = temp.split(".");

          return `${date} ${moment === "00:00:00" ? "" : moment}`;
        }

        return time;
      }

      return "";
    },

    hint(): string {
      return pageInfoI18n[this.$localePath || "/"].time;
    },
  },
});
