import { utoa } from "vuepress-shared";
import { uml } from "./uml.js";

import type { PluginSimple } from "markdown-it";

export const presentation: PluginSimple = (md) => {
  md.use(uml, {
    name: "presentation",
    open: "slidestart",
    close: "slideend",
    render: (tokens, index): string => {
      const token = tokens[index];
      const key = `presentation-${index}`;
      const { content, info } = token;

      return `<Presentation id="${key}" code="${utoa(content)}" theme="${
        info.trim() || "auto"
      }"></Presentation>`;
    },
  });
};
