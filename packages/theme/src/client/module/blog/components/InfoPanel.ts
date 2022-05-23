import { h } from "vue";

import DropTransition from "@theme-hope/components/transitions/DropTransition";
import BloggerInfo from "@theme-hope/module/blog/components/BloggerInfo";
import InfoList from "@theme-hope/module/blog/components/InfoList";

import type { FunctionalComponent, VNode } from "vue";

import "../styles/info-panel.scss";

const InfoPanel: FunctionalComponent = (): VNode =>
  h("aside", { class: "blog-info-wrapper" }, [
    h(DropTransition, () => h(BloggerInfo)),
    h(DropTransition, { delay: 0.04 }, () => h(InfoList)),
  ]);

InfoPanel.displayName = "InfoPanel";

export default InfoPanel;
