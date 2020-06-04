<template>
  <span v-if="words" class="words-info" :title="hint">
    <WordIcon />
    <span v-text="words" />
  </span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { HopeLangI18nConfig, i18n } from "@mr-hope/vuepress-shared-utils";
import WordIcon from "@mr-hope/vuepress-shared-utils/icons/WordIcon.vue";

@Component({ components: { WordIcon } })
export default class ReadTimeInfo extends Vue {
  private get words(): string {
    const { readingTime } = this.$themeLocaleConfig || i18n.getDefaultLocale();

    return readingTime.word.replace(
      "$word",
      this.$page.readingTime.words.toString()
    );
  }

  private get hint(): string {
    return (this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog).words;
  }
}
</script>
