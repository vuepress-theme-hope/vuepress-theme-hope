<template>
  <span v-if="time" class="time-info">
    <CalendarIcon />
    <span v-text="time" />
  </span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CalendarIcon from '@mr-hope/vuepress-shared-utils/icons/CalendarIcon.vue';

@Component({ components: { CalendarIcon } })
export default class TimeInfo extends Vue {
  private get time() {
    const { time } = this.$frontmatter;

    if (time) {
      if (time.indexOf('T') !== -1) {
        const [date, temp] = time.split('T');
        const [moment] = temp.split('.');

        return `${date} ${moment === '00:00:00' ? '' : moment}`;
      }

      return time;
    }

    return '';
  }
}
</script>
