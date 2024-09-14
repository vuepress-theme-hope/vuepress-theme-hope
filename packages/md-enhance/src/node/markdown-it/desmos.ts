import { container } from "@mdit/plugin-container";
import { encodeData } from "@vuepress/helper";
import type { PluginSimple } from "markdown-it";

export const desmos: PluginSimple = (md) => {
  container(md, {
    name: "desmos",
    openRender: (tokens, index) => {
      const key = `desmos-${index}`;
      const code = new Array<string>();

      for (let i = index; i < tokens.length; i++) {
        const { type, content } = tokens[i];

        if (type === "container_desmos_close") break;
        if (!content) continue;
        code.push(content);
      }

      return `<Desmos id="${key}" code="${encodeData(code.join())}">`;
    },
    closeRender: () => {
      return "</Desmos>";
    },
  });
};
