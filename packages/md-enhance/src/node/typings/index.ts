import type { MarkdownItIncludeOptions } from "@mdit/plugin-include";
import type { MarkdownItStylizeConfig } from "@mdit/plugin-stylize";

export { type MarkdownItAttrsOptions as AttrsOptions } from "@mdit/plugin-attrs";
export { type MarkdownItFigureOptions as FigureOptions } from "@mdit/plugin-figure";
export { type MarkdownItImgMarkOptions as ImgMarkOptions } from "@mdit/plugin-img-mark";
export { type MarkdownItMathjaxOptions as MathjaxOptions } from "@mdit/plugin-mathjax";
export { type MarkdownItKatexOptions as KatexOptions } from "@mdit/plugin-katex";
export { type MarkdownItTaskListOptions as TasklistOptions } from "@mdit/plugin-tasklist";

export type IncludeOptions = Omit<MarkdownItIncludeOptions, "currentPath">;
export type StylizeOptions = MarkdownItStylizeConfig[];

export * from "./alert.js";
export * from "./hint.js";
export * from "./locales.js";
export * from "./playground.js";
export * from "./revealjs.js";
export * from "./sandpack.js";
export * from "./vuePlayground.js";
