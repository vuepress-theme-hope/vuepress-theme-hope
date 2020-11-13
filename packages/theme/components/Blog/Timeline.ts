import { Component, Mixins } from "vue-property-decorator";
import MyTransition from "@theme/components/MyTransition.vue";
import { TimelineMixin } from "@theme/util/articleMixin";
import { getDefaultLocale } from "@mr-hope/vuepress-shared-utils";

@Component({ components: { MyTransition } })
export default class Timeline extends Mixins(TimelineMixin) {
  private get hint(): string {
    return (
      (this.$themeConfig.blog && this.$themeConfig.blog.timeline) ||
      this.$themeLocaleConfig.blog.timelineText ||
      getDefaultLocale().blog.timelineText
    );
  }

  private navigate(url: string): void {
    void this.$router.push(url);
  }
}
