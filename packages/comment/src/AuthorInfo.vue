<template>
  <span v-if="author">
    <AuthorIcon />
    <span v-text="author" />
  </span>
</template>

<script lang="ts">
/* global COMMENT_OPTIONS */
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
}
</script>
