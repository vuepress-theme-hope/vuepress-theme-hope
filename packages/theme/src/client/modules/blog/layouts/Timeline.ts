import type { FunctionalComponent } from "vue";
import { h } from "vue";

import DropTransition from "@theme-hope/components/transitions/DropTransition";
import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper";
import InfoPanel from "@theme-hope/modules/blog/components/InfoPanel";
import TimelineItems from "@theme-hope/modules/blog/components/TimelineItems";

const Timeline: FunctionalComponent = () =>
  h(BlogWrapper, () =>
    h(
      "div",
      { class: "vp-page vp-blog" },
      h("div", { class: "blog-page-wrapper" }, [
        h("main", { id: "main-content", class: "vp-blog-main" }, [
          h(DropTransition, { appear: true, delay: 0.24 }, () =>
            h(TimelineItems),
          ),
        ]),
        h(DropTransition, { delay: 0.16 }, () => h(InfoPanel, { key: "blog" })),
      ]),
    ),
  );

Timeline.displayName = "Timeline";

export default Timeline;
