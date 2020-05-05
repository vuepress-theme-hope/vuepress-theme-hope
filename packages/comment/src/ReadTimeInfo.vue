<template>
  <span v-if="readtime" class="read-time-info">
    <TimeIcon />
    <span v-text="readtime" />
  </span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TimeIcon from '@mr-hope/vuepress-shared-utils/icons/TimeIcon.vue';
import { i18n } from '@mr-hope/vuepress-shared-utils';

@Component({ components: { TimeIcon } })
export default class ReadTimeInfo extends Vue {
  private get readtime(): string {
    const { readingTime } = this.$page;

    return i18n.getLocale(this.$lang).readingTime.time(readingTime);
  }
}
</script>
