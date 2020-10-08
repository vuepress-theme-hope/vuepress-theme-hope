import { defineComponent } from "@vue/composition-api";
import { i18n } from "@mr-hope/vuepress-shared-utils";

import WordIcon from "@mr-hope/vuepress-shared-utils/icons/WordIcon.vue";

export default defineComponent({
  name: "ReadTimeInfo",

  components: { WordIcon },

  computed: {
    words(): string {
      const { readingTime } =
        this.$themeLocaleConfig || i18n.getDefaultLocale();

      return readingTime.word.replace(
        "$word",
        this.$page.readingTime.words.toString()
      );
    },

    hint(): string {
      return (this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog)
        .words;
    },
  },
});
