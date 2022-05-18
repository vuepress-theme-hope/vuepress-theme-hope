import { hash } from "@vuepress/utils";
import type Token from "markdown-it/lib/token";

export const echartsRender = (tokens: Token[], index: number): string => {
  const { nesting, info } = tokens[index];
  const title = info
    .trimStart()
    // 'echarts' length
    .slice(7)
    .trim();
  const key = `echarts-${hash(index)}`;

  if (nesting === -1) return `</ECharts>`;

  let config = "";

  for (let i = index; i < tokens.length; i++) {
    const { type, content, info } = tokens[i];

    if (type === "container_echarts_close") break;
    if (!content) continue;
    if (type === "fence" && (info === "json" || info === "js"))
      config = encodeURIComponent(content);
  }

  return `<ECharts title="${title}" id="${key}" config="${config}">`;
};
