import { Component, Vue } from "vue-property-decorator";
import AuthorIcon from "@mr-hope/vuepress-shared-utils/icons/AuthorIcon.vue";
import { commentOptions, pageInfoI18n } from "./define";
import { CommentOptions } from "../types";

@Component({ components: { AuthorIcon } })
export default class AuthorInfo extends Vue {
  private commentOption: CommentOptions = commentOptions;

  private get author(): string {
    const { author } = this.$frontmatter;

    return (
      (author as string) ||
      (author === false ? "" : this.commentOption.author || "")
    );
  }

  private get hint(): string {
    return pageInfoI18n[this.$localePath || "/"].author;
  }
}
