/* global COMMENT_OPTIONS */
import { defineComponent, ref } from "@vue/composition-api";
import { i18n } from "@mr-hope/vuepress-shared-utils";

import AuthorIcon from "@mr-hope/vuepress-shared-utils/icons/AuthorIcon.vue";

export default defineComponent({
  name: "AuthorInfo",

  components: { AuthorIcon },

  setup() {
    const commentOption = ref(COMMENT_OPTIONS);

    return { commentOption };
  },

  computed: {
    author(): string {
      const { author } = this.$frontmatter;

      return (
        (author as string) ||
        (author === false ? "" : this.commentOption.author || "")
      );
    },

    hint(): string {
      return (this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog)
        .author;
    },
  },
});
