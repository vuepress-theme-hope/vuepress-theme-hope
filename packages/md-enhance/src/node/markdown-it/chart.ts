/* eslint-disable max-statements */
import { hash } from "@vuepress/utils";
import { default as Token } from "markdown-it/lib/token";

export const chartRender = (tokens: Token[], index: number): string => {
  const { nesting, info } = tokens[index];
  const title = info
    .trimStart()
    // 'chart' length
    .slice(5)
    .trim();

  const key = `chart-${hash(index)}`;

  if (nesting === -1) return `</ChartJS>`;

  let config = "{}";
  let configType = "";

  for (let i = index; i < tokens.length; i++) {
    const { type, content, info } = tokens[i];

    if (type === "container_chart_close") break;

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
    tokens[i].type = "chart_empty";
    // hide token
    tokens[i].hidden = true;
  }

  return `<ChartJS id="${key}" config="${config}" ${
    title ? `title="${encodeURIComponent(title)}" ` : ""
  }type="${configType}">`;
};
