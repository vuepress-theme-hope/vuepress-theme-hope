import type { EnhanceApp } from "@mr-hope/vuepress-types";

import "./styles/container.styl";

const enhanceApp: EnhanceApp = ({ Vue }) => {
  if (MARKDOWN_ENHANCE_ALIGN) void import("./styles/align.styl");

  if (MARKDOWN_ENHANCE_FOOTNOTE) void import("./styles/footnote.styl");

  if (MARKDOWN_ENHANCE_FLOWCHART)
    Vue.component(
      "FlowChart",
      () => import(/* webpackChunkName: "flowchart" */ "./FlowChart.vue")
    );

  if (MARKDOWN_ENHANCE_PRESENTATION)
    Vue.component(
      "Presentation",
      () => import(/* webpackChunkName: "presentation" */ "./Presentation.vue")
    );

  if (MARKDOWN_ENHANCE_TEX) {
    void import("./styles/tex.styl");
    void import("katex/dist/katex.min.css");
  }
};

export default enhanceApp;
