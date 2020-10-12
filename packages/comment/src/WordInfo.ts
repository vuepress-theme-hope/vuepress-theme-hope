import { Component, Vue } from "vue-property-decorator";
import WordIcon from "@mr-hope/vuepress-shared-utils/icons/WordIcon.vue";

@Component({ components: { WordIcon } })
export default class ReadTimeInfo extends Vue {
  private get words(): string {
    const word = READING_TIME_I18N[this.$localePath || "/"].word;

    return word.replace("$word", this.$page.readingTime.words.toString());
  }

  private get hint(): string {
    return PAGE_INFO_I18N[this.$localePath || "/"].words;
  }
}
