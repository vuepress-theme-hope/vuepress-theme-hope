import { Component, Mixins } from "vue-property-decorator";
import MyTransition from "@theme/components/MyTransition.vue";
import TimeIcon from "@mr-hope/vuepress-plugin-comment/lib/client/icons/TimeIcon.vue";
import { TimelineMixin } from "@theme/util/articleMixin";
import { getDefaultLocale } from "@mr-hope/vuepress-shared";

@Component({ components: { MyTransition, TimeIcon } })
export default class TimelineList extends Mixins(TimelineMixin) {
  private get timeline(): string {
    return (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.$themeLocaleConfig.blog!.timeline || getDefaultLocale().blog.timeline
    );
  }

  private navigate(url: string): void {
    void this.$router.push(url);
  }
}
