import { Component, Vue } from "vue-property-decorator";
import AuthorIcon from "@mr-hope/vuepress-shared-utils/icons/AuthorIcon.vue";
import { CommentOptions } from "../types";

@Component({ components: { AuthorIcon } })
export default class AuthorInfo extends Vue {
  private commentOption: CommentOptions = COMMENT_OPTIONS;

  private get author(): string {
    const { author } = this.$frontmatter;

    return (
      (author as string) ||
      (author === false ? "" : this.commentOption.author || "")
    );
  }

  private get hint(): string {
    return PAGE_INFO_I18N.author[this.$localePath || "/"];
  }
}
