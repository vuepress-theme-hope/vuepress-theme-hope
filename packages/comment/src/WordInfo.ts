import { defineComponent } from "@vue/composition-api";
import WordIcon from "@mr-hope/vuepress-shared-utils/icons/WordIcon.vue";
import { i18n } from "@mr-hope/vuepress-shared-utils";

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
