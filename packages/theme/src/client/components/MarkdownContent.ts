import type { FunctionalComponent, VNode } from "vue";
import { h } from "vue";
import { Content } from "vuepress/client";

const MarkdownContent: FunctionalComponent<{ custom?: boolean }> = ({
  custom,
}): VNode => h(Content, { class: ["theme-hope-content", { custom }] });

MarkdownContent.displayName = "MarkdownContent";

MarkdownContent.props = {
  custom: Boolean,
};

export default MarkdownContent;
