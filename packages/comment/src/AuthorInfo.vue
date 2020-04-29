<template>
  <span v-if="author">
    <AuthorIcon />
    <span v-text="author" />
  </span>
</template>

<script lang="ts">
/* global COMMENT_OPTIONS */
import { Component, Vue } from 'vue-property-decorator';
import AuthorIcon from '@mr-hope/vuepress-shared-utils/icons/AuthorIcon.vue';
import { ValineOptions } from '../types';

@Component({ components: { AuthorIcon } })
export default class AuthorInfo extends Vue {
  private valineConfig: ValineOptions = COMMENT_OPTIONS;

  /** 作者 */
  private get author() {
    const { author } = this.$frontmatter;

    return (
      (author as string) ||
      (author === false ? '' : this.valineConfig.author || '')
    );
  }
}
</script>
