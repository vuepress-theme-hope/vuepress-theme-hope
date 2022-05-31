import { hash } from "@vuepress/utils";
import { uml } from "./uml";

import type { PluginSimple } from "markdown-it";

export const presentation: PluginSimple = (md) => {
  md.use(uml, {
    name: "presentation",
    open: "slidestart",
    close: "slideend",
    render: (tokens, index): string => {
      const token = tokens[index];
      const key = `presentation-${hash(index)}`;
      const { content, info } = token;

      return `<Presentation id="${key}" data-code="${encodeURIComponent(
        content
      )}" theme="${info.trim() || "auto"}"></Presentation>`;
    },
  });
};
