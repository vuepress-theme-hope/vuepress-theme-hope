import type { MarkdownItPlantumlOptions } from "@mdit/plugin-plantuml";
import { plantuml as _plantuml } from "@mdit/plugin-plantuml";
import type { PluginWithOptions } from "markdown-it";

export const plantuml: PluginWithOptions<MarkdownItPlantumlOptions[]> = (
  md,
  options = [
    "chronology",
    "gantt",
    "json",
    "latex",
    "math",
    "mindmap",
    "regex",
    "salt",
    "uml",
    "wbs",
    "yaml",
  ].map((name) => ({ name })),
) => {
  options.forEach((option) => {
    md.use(_plantuml, option);
  });
};
