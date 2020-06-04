<template>
  <span v-if="time" class="time-info" :title="hint">
    <CalendarIcon />
    <span v-text="time" />
  </span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CalendarIcon from "@mr-hope/vuepress-shared-utils/icons/CalendarIcon.vue";
import { i18n } from "@mr-hope/vuepress-shared-utils";

@Component({ components: { CalendarIcon } })
export default class TimeInfo extends Vue {
  private get time() {
    const { time } = this.$frontmatter;

    if (time) {
      if (time.indexOf("T") !== -1) {
        const [date, temp] = time.split("T");
        const [moment] = temp.split(".");

        return `${date} ${moment === "00:00:00" ? "" : moment}`;
      }

      return time;
    }

    return "";
  }

  private get hint(): string {
    return (this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog)
      .time;
  }
}
</script>
