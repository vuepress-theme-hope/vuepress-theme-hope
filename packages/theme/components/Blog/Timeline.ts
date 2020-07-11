import { Component, Mixins } from "vue-property-decorator";
import MyTransition from "@theme/components/MyTransition.vue";
import { TimelineMixin } from "@theme/util/articleMixin";
import { i18n } from "@mr-hope/vuepress-shared-utils";

// eslint-disable-next-line @typescript-eslint/naming-convention
@Component({ components: { MyTransition } })
export default class Timeline extends Mixins(TimelineMixin) {
  /** 提示文字 */
  private get hint(): string {
    return (
      (this.$themeConfig.blog && this.$themeConfig.blog.timeline) ||
      this.$themeLocaleConfig.blog.timelineText ||
      i18n.getDefaultLocale().blog.timelineText
    );
  }

  private navigate(url: string): void {
    void this.$router.push(url);
  }
}
