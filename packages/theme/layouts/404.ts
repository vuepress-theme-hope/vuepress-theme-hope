import Vue from "vue";
import Common from "@theme/components/Common.vue";
import { getDefaultLocale } from "@mr-hope/vuepress-shared";
import type { HopeLangI18nConfig } from "@mr-hope/vuepress-shared";

export default Vue.extend({
  name: "NotFound",

  components: { Common },

  computed: {
    i18n(): HopeLangI18nConfig["error404"] {
      return this.$themeLocaleConfig.error404 || getDefaultLocale().error404;
    },

    msg(): string {
      return this.i18n.hint[Math.floor(Math.random() * this.i18n.hint.length)];
    },
  },

  methods: {
    back(): void {
      window.history.go(-1);
    },
  },
});
