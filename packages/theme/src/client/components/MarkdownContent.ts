import { Content } from "@vuepress/client";
import type { FunctionalComponent, VNode } from "vue";
import { h } from "vue";

const MarkdownContent: FunctionalComponent<{ custom?: boolean }> = ({
  custom,
}): VNode => h(Content, { class: ["theme-hope-content", { custom }] });

MarkdownContent.displayName = "MarkdownContent";

MarkdownContent.props = {
  custom: Boolean,
};

export default MarkdownContent;
