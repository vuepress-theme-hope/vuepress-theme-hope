import { Component, Vue } from "vue-property-decorator";
import WordIcon from "@mr-hope/vuepress-shared-utils/icons/WordIcon.vue";
import { pageInfoI18n, readingTimeI18n } from "./define";

@Component({ components: { WordIcon } })
export default class ReadTimeInfo extends Vue {
  private get words(): string {
    const word = readingTimeI18n[this.$localePath || "/"].word;

    return word.replace("$word", this.$page.readingTime.words.toString());
  }

  private get hint(): string {
    return pageInfoI18n[this.$localePath || "/"].words;
  }
}
