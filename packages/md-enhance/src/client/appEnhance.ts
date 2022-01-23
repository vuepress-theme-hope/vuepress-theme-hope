import { defineClientAppEnhance } from "@vuepress/client";
import CodeGroup from "@CodeGroup";
import CodeGroupItem from "@CodeGroupItem";
import Mermaid from "@Mermaid";
import Presentation from "@Presentation";

import "./styles/index.scss";

declare const MARKDOWN_ENHANCE_ALIGN: boolean;
declare const MARKDOWN_ENHANCE_CONTAINER: boolean;
declare const MARKDOWN_ENHANCE_FOOTNOTE: boolean;
declare const MARKDOWN_ENHANCE_TASKLIST: boolean;
declare const MARKDOWN_ENHANCE_TEX: boolean;

export default defineClientAppEnhance(({ app }) => {
  if (MARKDOWN_ENHANCE_ALIGN) void import("./styles/align.scss");

  if (MARKDOWN_ENHANCE_CONTAINER) void import("./styles/container/index.scss");

  if (MARKDOWN_ENHANCE_FOOTNOTE) void import("./styles/footnote.scss");

  if (Mermaid.name) app.component("MermaidChart", Mermaid);

  if (CodeGroup.name) {
    app.component("CodeGroup", CodeGroup);
    app.component("CodeGroupItem", CodeGroupItem);
  }

  if (Presentation.name) {
    app.component("PresentationViewer", Presentation);
    void import("./styles/slides.scss");
    void import("./styles/theme/fonts/league-gothic/league-gothic.css");
    void import("./styles/theme/fonts/source-sans-pro/source-sans-pro.css");
  }

  if (MARKDOWN_ENHANCE_TASKLIST) void import("./styles/tasklist.scss");

  if (MARKDOWN_ENHANCE_TEX) {
    void import("./styles/tex.scss");
    void import("katex/dist/katex.min.css");
  }
});
