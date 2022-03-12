/* eslint-disable max-statements */
import { hash } from "@vuepress/utils";
import type Token from "markdown-it/lib/token";

export const chartRender = (tokens: Token[], index: number): string => {
  const { nesting, info } = tokens[index];
  const title = /^ chart\s*(.*)\s*$/u.exec(info);
  const key = `chart-${hash(index)}`;

  if (nesting === -1) return `</ChartJS>`;

  let config = "";

  for (let i = index; i < tokens.length; i++) {
    const { type, content, info } = tokens[i];
    if (type === "container_chart_close") break;
    if (!content) continue;
    if ((type === "fence" && info === "json") || info === "js")
      config = encodeURIComponent(content);
  }

  return `<ChartJS title="${title?.[1] || ""}" id="${key}" config="${config}">`;
};
