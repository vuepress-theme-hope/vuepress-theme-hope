<template>
  <span v-if="words" class="words-info">
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
    const { readingTime } =
      (this.$themeLocaleConfig as HopeLangI18nConfig) ||
      i18n.getDefaultLocale();

    return readingTime.word.replace(
      "$word",
      this.$page.readingTime.words.toString(),
    );
  }
}
</script>
