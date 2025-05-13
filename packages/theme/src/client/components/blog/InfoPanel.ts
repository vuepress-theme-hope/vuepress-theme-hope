import type { Slot } from "@vuepress/helper/client";
import type { FunctionalComponent, VNode } from "vue";
import { h } from "vue";

import BloggerInfo from "@theme-hope/components/blog/BloggerInfo";
import InfoList from "@theme-hope/components/blog/InfoList";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import type { BloggerInfoSlotData } from "@theme-hope/typings/slots";

import "../../styles/blog/info-panel.scss";

const InfoPanel: FunctionalComponent<
  Record<never, never>,
  [],
  {
    bloggerInfo?: Slot<BloggerInfoSlotData>;
    infoBefore?: Slot;
    infoAfter?: Slot;
  }
> = (_props, { slots }): VNode =>
  h("aside", { class: "vp-blog-info-wrapper" }, [
    slots.infoBefore?.(),
    h(DropTransition, () => h(BloggerInfo, {}, slots)),
    h(DropTransition, { delay: 0.04 }, () => h(InfoList)),
    slots.infoAfter?.(),
  ]);

InfoPanel.displayName = "InfoPanel";

export default InfoPanel;
