import { defineComponent } from "@vue/composition-api";
import { HopeLangI18nConfig, i18n } from "@mr-hope/vuepress-shared-utils";

import TimeIcon from "@mr-hope/vuepress-shared-utils/icons/TimeIcon.vue";

export default defineComponent({
  name: "ReadtimeInfo",

  components: { TimeIcon },

  computed: {
    readtime(): string {
      const { readingTime } =
        (this.$themeLocaleConfig as HopeLangI18nConfig) ||
        i18n.getDefaultLocale();

      return this.$page.readingTime.minutes < 1
        ? readingTime.minute
        : readingTime.time.replace(
            "$time",
            Math.round(this.$page.readingTime.minutes).toString()
          );
    },

    hint(): string {
      return (this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog)
        .readingTime;
    },
  },
});
