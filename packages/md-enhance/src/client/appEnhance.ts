import { defineClientAppEnhance } from "@vuepress/client";
import CodeGroup from "@CodeGroup";
import CodeGroupItem from "@CodeGroupItem";
import ChartJS from "@ChartJS";
import FlowChart from "@FlowChart";
import Mermaid from "@Mermaid";
import Presentation from "@Presentation";

declare const MARKDOWN_ENHANCE_ALIGN: boolean;
declare const MARKDOWN_ENHANCE_CONTAINER: boolean;
declare const MARKDOWN_ENHANCE_FOOTNOTE: boolean;
declare const MARKDOWN_ENHANCE_IMAGE_MARK: boolean;
declare const MARKDOWN_ENHANCE_TASKLIST: boolean;
declare const MARKDOWN_ENHANCE_TEX: boolean;

export default defineClientAppEnhance(({ app }) => {
  if (MARKDOWN_ENHANCE_ALIGN) void import("./styles/align.scss");

  if (MARKDOWN_ENHANCE_CONTAINER) void import("./styles/container/index.scss");

  if (MARKDOWN_ENHANCE_FOOTNOTE) void import("./styles/footnote.scss");

  if (MARKDOWN_ENHANCE_IMAGE_MARK) void import("./styles/image.scss");

  if (ChartJS.name) app.component("ChartJS", ChartJS);

  if (CodeGroup.name) {
    app.component("CodeGroup", CodeGroup);
    app.component("CodeGroupItem", CodeGroupItem);
  }

  if (FlowChart.name) app.component("FlowChart", FlowChart);

  if (Mermaid.name) app.component("MermaidChart", Mermaid);

  if (Presentation.name) app.component("PresentationViewer", Presentation);

  if (MARKDOWN_ENHANCE_TASKLIST) void import("./styles/tasklist.scss");

  if (MARKDOWN_ENHANCE_TEX) {
    void import("./styles/tex.scss");
    void import("katex/dist/katex.min.css");
  }
});
