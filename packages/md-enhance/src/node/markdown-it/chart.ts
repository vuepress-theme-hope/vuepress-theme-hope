import { utoa } from "vuepress-shared/node";
import { container } from "./container.js";

import type { PluginSimple } from "markdown-it";

export const chart: PluginSimple = (md) => {
  container(md, {
    name: "chart",
    openRender: (tokens, index) => {
      const title = tokens[index].info
        .trimStart()
        // 'chart' length
        .slice(5)
        .trim();

      const key = `chart-${index}`;

      let config = "{}";
      let configType = "";

      for (let i = index; i < tokens.length; i++) {
        const { type, content, info } = tokens[i];

        if (type === "container_chart_close") break;

        if (!content) continue;
        if (type === "fence") {
          if (info === "json") {
            config = utoa(content);
            configType = "json";
          } else if (info === "js" || info === "javascript") {
            config = utoa(content);
            configType = "js";
          }
        }

        // set to an unexist token type
        tokens[i].type = "chart_empty";
        // hide token
        tokens[i].hidden = true;
      }

      return `<ChartJS id="${key}" config="${config}" ${
        title ? `title="${encodeURIComponent(title)}" ` : ""
      }type="${configType}">`;
    },
    closeRender: () => `</ChartJS>`,
  });
};
