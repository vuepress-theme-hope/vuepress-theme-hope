import { Component, Mixins } from "vue-property-decorator";
import Anchor from "@theme/components/Anchor.vue";
import MyTransition from "@theme/components/MyTransition.vue";
import { TimelineMixin } from "@theme/util/articleMixin";
import { getDefaultLocale } from "@mr-hope/vuepress-shared";

import type { SidebarHeader } from "@theme/util/groupHeader";

@Component({ components: { Anchor, MyTransition } })
export default class Timeline extends Mixins(TimelineMixin) {
  get hint(): string {
    return (
      (this.$themeConfig.blog && this.$themeConfig.blog.timeline) ||
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.$themeLocaleConfig.blog!.timelineText ||
      getDefaultLocale().blog.timelineText
    );
  }

  get anchorConfig(): SidebarHeader[] {
    return this.$timeline.map((item) => ({
      title: item.year.toString(),
      level: 2,
      slug: item.year.toString(),
    }));
  }

  navigate(url: string): void {
    void this.$router.push(url);
  }
}
