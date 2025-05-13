import type { FunctionalComponent, Slot } from "vue";
import { h } from "vue";

import InfoPanel from "@theme-hope/components/blog/InfoPanel";
import TimelineItems from "@theme-hope/components/blog/TimelineItems";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import type { BloggerInfoSlotData } from "@theme-hope/typings/slots";

const TimelinePage: FunctionalComponent<
  Record<never, never>,
  [],
  {
    // articles
    articlesBefore?: Slot;
    articlesAfter?: Slot;

    // info
    bloggerInfo?: Slot<BloggerInfoSlotData>;
    infoBefore?: Slot;
    infoAfter?: Slot;
  }
> = (_props, { slots }) =>
  h(
    "div",
    { class: "vp-page vp-blog" },
    h("div", { class: "blog-page-wrapper" }, [
      h("main", { id: "main-content", class: "vp-blog-main" }, [
        slots.articlesBefore?.(),
        h(DropTransition, { appear: true }, () => h(TimelineItems)),
        slots.articlesAfter?.(),
      ]),
      h(DropTransition, { appear: true }, () =>
        h(InfoPanel, { key: "blog" }, slots),
      ),
    ]),
  );

TimelinePage.displayName = "TimelinePage";

export default TimelinePage;
