import { Component, Vue } from "vue-property-decorator";
import Common from "@theme/components/Common.vue";
import { i18n, HopeLangI18nConfig } from "@mr-hope/vuepress-shared-utils";

// eslint-disable-next-line @typescript-eslint/naming-convention
@Component({ components: { Common } })
export default class NotFound extends Vue {
  private get i18n(): HopeLangI18nConfig["error404"] {
    return this.$themeLocaleConfig.error404 || i18n.getDefaultLocale().error404;
  }

  private get msg(): string {
    return this.i18n.hint[Math.floor(Math.random() * this.i18n.hint.length)];
  }

  private back(): void {
    window.history.go(-1);
  }
}
