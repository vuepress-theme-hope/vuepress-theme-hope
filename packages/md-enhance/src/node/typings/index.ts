import type { MarkdownItIncludeOptions } from "@mdit/plugin-include";
import type { MarkdownItStylizeConfig } from "@mdit/plugin-stylize";

export { type MarkdownItAttrsOptions as AttrsOptions } from "@mdit/plugin-attrs";
export { type MarkdownItTaskListOptions as TasklistOptions } from "@mdit/plugin-tasklist";

export type IncludeOptions = Omit<MarkdownItIncludeOptions, "currentPath">;
export type StylizeOptions = MarkdownItStylizeConfig[];

export * from "./playground.js";
export * from "./sandpack.js";
export * from "./vuePlayground.js";
