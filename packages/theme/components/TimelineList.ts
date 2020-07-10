import { Component, Mixins } from "vue-property-decorator";
import MyTransition from "@theme/components/MyTransition.vue";
import TimeIcon from "@mr-hope/vuepress-shared-utils/icons/TimeIcon.vue";
import { TimelineMixin } from "@theme/util/articleMixin";
import { i18n } from "@mr-hope/vuepress-shared-utils";

// eslint-disable-next-line @typescript-eslint/naming-convention
@Component({ components: { MyTransition, TimeIcon } })
export default class TimelineList extends Mixins(TimelineMixin) {
  private get timeline(): string {
    return (
      this.$themeLocaleConfig.blog.timeline ||
      i18n.getDefaultLocale().blog.timeline
    );
  }

  private navigate(url: string): void {
    void this.$router.push(url);
  }
}
