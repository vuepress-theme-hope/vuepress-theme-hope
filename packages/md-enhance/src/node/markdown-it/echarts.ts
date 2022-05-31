import { hash } from "@vuepress/utils";

import { container } from "./container";

import type { PluginSimple } from "markdown-it";

export const echarts: PluginSimple = (md) => {
  container(md, {
    name: "echarts",

    openRender: (tokens, index) => {
      const title = tokens[index].info
        .trimStart()
        // 'echarts' length
        .slice(7)
        .trim();

      const key = `echarts-${hash(index)}`;

      let config = "{}";
      let configType = "";

      for (let i = index; i < tokens.length; i++) {
        const { type, content, info } = tokens[i];

        if (type === "container_echarts_close") break;

        if (!content) continue;
        if (type === "fence") {
          if (info === "json") {
            config = encodeURIComponent(content);
            configType = "json";
          } else if (info === "js" || info === "javascript") {
            config = encodeURIComponent(content);
            configType = "js";
          }
        }

        // set to an unexisit token type
        tokens[i].type = "echarts_empty";
        // hide token
        tokens[i].hidden = true;
      }

      return `<ECharts id="${key}" config="${config}" ${
        title ? `title="${encodeURIComponent(title)}" ` : ""
      }type="${configType}">`;
    },
    closeRender: () => `</ECharts>`,
  });
};
