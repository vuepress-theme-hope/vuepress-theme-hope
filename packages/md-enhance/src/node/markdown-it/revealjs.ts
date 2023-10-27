import { uml } from "@mdit/plugin-uml";
import type { PluginSimple } from "markdown-it";
import { utoa } from "vuepress-shared/node";

export const revealJs: PluginSimple = (md) => {
  md.use(uml, {
    name: "revealjs",
    open: "slidestart",
    close: "slideend",
    render: (tokens, index): string => {
      const token = tokens[index];
      const key = `revealjs-${index}`;
      const { content, info } = token;

      return `<RevealJs id="${key}" code="${utoa(content)}" theme="${
        info.trim() || "auto"
      }"></RevealJs>`;
    },
  });
};
