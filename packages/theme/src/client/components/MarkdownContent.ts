import { Content } from "@vuepress/client";
import { h } from "vue";

import type { FunctionalComponent, VNode } from "vue";

const MarkdownContent: FunctionalComponent<{ custom?: boolean }> = ({
  custom,
}): VNode =>
  h("div", { class: ["theme-hope-content", { custom }] }, h(Content));

MarkdownContent.displayName = "MarkdownContent";

export default MarkdownContent;
