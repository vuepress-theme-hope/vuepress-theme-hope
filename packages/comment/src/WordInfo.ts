import { Component, Vue } from "vue-property-decorator";
import WordIcon from "@mr-hope/vuepress-shared-utils/icons/WordIcon.vue";
import { i18n } from "@mr-hope/vuepress-shared-utils";

// eslint-disable-next-line @typescript-eslint/naming-convention
@Component({ components: { WordIcon } })
export default class ReadTimeInfo extends Vue {
  private get words(): string {
    const { readingTime } = this.$themeLocaleConfig || i18n.getDefaultLocale();

    return readingTime.word.replace(
      "$word",
      this.$page.readingTime.words.toString()
    );
  }

  private get hint(): string {
    return (this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog).words;
  }
}
