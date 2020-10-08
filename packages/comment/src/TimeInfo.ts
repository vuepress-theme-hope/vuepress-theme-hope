import { defineComponent } from "@vue/composition-api";
import { i18n } from "@mr-hope/vuepress-shared-utils";

import CalendarIcon from "@mr-hope/vuepress-shared-utils/icons/CalendarIcon.vue";

export default defineComponent({
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
      return (this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog)
        .time;
    },
  },
});
