import { utoa } from "vuepress-shared/node";
import { container } from "./container.js";
import type { default as Token } from "markdown-it/lib/token.js";

import type { PluginSimple } from "markdown-it";

const echartsRender = (tokens: Token[], index: number): string => {
  const token = tokens[index];
  const key = `echarts-${index}`;
  const { content, info } = token;
  const title = info.trim().split(":", 2)[1];

  return `<ECharts id="${key}" config="${utoa(content)}"${
    title ? ` title="${encodeURIComponent(title)}"` : ""
  }></ECharts>`;
};

export const echarts: PluginSimple = (md) => {
  // Handle ```echarts blocks
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args;
    const { info } = tokens[index];
    const realInfo = info.split(":", 2)[0];

    if (realInfo === "echarts") return echartsRender(tokens, index);

    return fence!(...args);
  };

  md.renderer.rules["echarts"] = echartsRender;

  container(md, {
    name: "echarts",

    openRender: (tokens, index) => {
      const title = tokens[index].info
        .trimStart()
        // 'echarts' length
        .slice(7)
        .trim();

      const key = `echarts-${index}`;

      let config = "{}";
      let isJavaScript = false;

      for (let i = index; i < tokens.length; i++) {
        const { type, content, info } = tokens[i];

        if (type === "container_echarts_close") break;

        if (!content) continue;
        if (type === "fence") {
          if (info === "json") config = content;
          else if (info === "js" || info === "javascript") {
            config = content;
            isJavaScript = true;
          }
        }

        // set to an unexist token type
        tokens[i].type = "echarts_empty";
        // hide token
        tokens[i].hidden = true;
      }

      return `<ECharts id="${key}" config="${utoa(config)}"${
        title ? ` title="${encodeURIComponent(title)}"` : ""
      }${isJavaScript ? ' type="js"' : ""}>`;
    },
    closeRender: () => `</ECharts>`,
  });
};
