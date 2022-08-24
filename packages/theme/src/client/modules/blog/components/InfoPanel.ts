import { h } from "vue";

import DropTransition from "@theme-hope/components/transitions/DropTransition.js";
import BloggerInfo from "@theme-hope/modules/blog/components/BloggerInfo.js";
import InfoList from "@theme-hope/modules/blog/components/InfoList.js";

import type { FunctionalComponent, VNode } from "vue";

import "../styles/info-panel.scss";

const InfoPanel: FunctionalComponent = (): VNode =>
  h("aside", { class: "blog-info-wrapper" }, [
    h(DropTransition, () => h(BloggerInfo)),
    h(DropTransition, { delay: 0.04 }, () => h(InfoList)),
  ]);

InfoPanel.displayName = "InfoPanel";

export default InfoPanel;
