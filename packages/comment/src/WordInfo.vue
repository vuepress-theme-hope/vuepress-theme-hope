<template>
  <span v-if="words" class="words-info">
    <WordIcon />
    <span v-text="words" />
  </span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WordIcon from '@mr-hope/vuepress-shared-utils/icons/WordIcon.vue';
import { i18n } from '@mr-hope/vuepress-shared-utils';

@Component({ components: { WordIcon } })
export default class ReadTimeInfo extends Vue {
  private get words() {
    const { readingTime } = this.$page;

    return i18n.getLocale(this.$lang).readingTime.word(readingTime);
  }
}
</script>
