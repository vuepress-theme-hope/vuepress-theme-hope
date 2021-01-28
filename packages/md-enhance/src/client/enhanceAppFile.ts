import FlowChart from "./FlowChart.vue";
import Presentation from "./Presentation.vue";

import type { EnhanceApp } from "@mr-hope/vuepress-types";

import "./styles/container.styl";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  if (MARKDOWN_ENHANCE_OPTIONS.align || MARKDOWN_ENHANCE_OPTIONS.enableAll)
    void import("./styles/align.styl");
  if (MARKDOWN_ENHANCE_OPTIONS.footnote || MARKDOWN_ENHANCE_OPTIONS.enableAll)
    void import("./styles/footnote.styl");
  if (MARKDOWN_ENHANCE_OPTIONS.tex || MARKDOWN_ENHANCE_OPTIONS.enableAll) {
    void import("./styles/tex.styl");
    void import("katex/dist/katex.min.css");
  }

  if (MARKDOWN_ENHANCE_OPTIONS.flowchart || MARKDOWN_ENHANCE_OPTIONS.enableAll)
    Vue.component("FlowChart", FlowChart);
  if (
    MARKDOWN_ENHANCE_OPTIONS.presentation ||
    MARKDOWN_ENHANCE_OPTIONS.enableAll
  )
    Vue.component("Presentation", Presentation);
};

export default enhanceApp;
