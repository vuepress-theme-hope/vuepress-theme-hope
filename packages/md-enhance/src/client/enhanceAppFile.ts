import FlowChart from "@FlowChart";
import Mermaid from "@Mermaid";
import Presentation from "@Presentation";
import type { EnhanceApp } from "@mr-hope/vuepress-types";

import "./styles/container.styl";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  if (MARKDOWN_ENHANCE_ALIGN) void import("./styles/align.styl");

  if (MARKDOWN_ENHANCE_FOOTNOTE) void import("./styles/footnote.styl");

  if (MARKDOWN_ENHANCE_FLOWCHART) Vue.component("FlowChart", FlowChart);

  if (MARKDOWN_ENHANCE_MERMAID) Vue.component("Mermaid", Mermaid);

  if (MARKDOWN_ENHANCE_PRESENTATION)
    Vue.component("Presentation", Presentation);

  if (MARKDOWN_ENHANCE_TASKLIST) void import("./styles/tasklist.styl");

  if (MARKDOWN_ENHANCE_TEX) {
    void import("./styles/tex.styl");
    void import("katex/dist/katex.min.css");
  }
};

export default enhanceApp;
