import { Component, Mixins } from "vue-property-decorator";
import MyTransition from "@theme/components/MyTransition.vue";
import { TimelineMixin } from "@theme/util/articleMixin";
import { getDefaultLocale } from "@mr-hope/vuepress-shared";

@Component({ components: { MyTransition } })
export default class Timeline extends Mixins(TimelineMixin) {
  private get hint(): string {
    return (
      (this.$themeConfig.blog && this.$themeConfig.blog.timeline) ||
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.$themeLocaleConfig.blog!.timelineText ||
      getDefaultLocale().blog.timelineText
    );
  }

  private navigate(url: string): void {
    void this.$router.push(url);
  }
}
