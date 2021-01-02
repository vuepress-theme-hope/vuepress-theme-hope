import Vue from "vue";
import WordIcon from "./icons/WordIcon.vue";
import { pageInfoI18n, readingTimeI18n } from "./define";

export default Vue.extend({
  name: "ReadTimeInfo",

  components: { WordIcon },

  computed: {
    words(): string {
      const word = readingTimeI18n[this.$localePath || "/"].word;

      return word.replace("$word", this.$page.readingTime.words.toString());
    },

    hint(): string {
      return pageInfoI18n[this.$localePath || "/"].words;
    },
  },
});
