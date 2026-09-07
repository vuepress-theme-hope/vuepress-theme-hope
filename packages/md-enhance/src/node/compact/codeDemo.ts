import { container } from "@mdit/plugin-container";
import { demo } from "@mdit/plugin-demo";
import { encodeData } from "@vuepress/helper";
import type { PluginSimple } from "markdown-it";

import { escapeHtml } from "../markdown-it/utils.js";
import { logger } from "../utils.js";

/**
 * @deprecated
 * @param md - Markdown-it instance
 */
export const legacyCodeDemo: PluginSimple = (md) => {
  md.use(container, {
    name: "demo",
    openRenderer: (tokens, index): string => {
      logger.warn(
        "demo container is deprecated, you should use normal-demo, react-demo and vue-demo container instead.",
      );

      const { info } = tokens[index];
      const type = /\[(?<type>.*)\]/u.exec(info)?.[1] ?? "normal";
      const title = /^ demo\s*(?:\[.*?\])?\s*(?<title>.*)\s*$/u.exec(info)?.[1];

      let config = "";
      const code: Record<string, string> = {};

      for (let i = index; i < tokens.length; i++) {
        // oxlint-disable-next-line no-shadow
        const { type, content, info } = tokens[i];
        const language = info
          ? (/^(?<lang>[^ :[{]+)/u.exec(md.utils.unescapeAll(info).trim())?.[1] ?? "text")
          : "";

        if (type === `container_demo_close`) break;
        if (!content) continue;
        if (type === "fence") {
          if (language === "json") config = encodeData(content);
          else code[language] = content;
        }
      }

      return `
<CodeDemo id="code-demo-${index}" type="${type}"${
        title ? ` title="${encodeURIComponent(title)}"` : ""
      }${config ? ` config="${config}"` : ""} code="${encodeData(JSON.stringify(code))}">
`;
    },
    closeRenderer: () => `</CodeDemo>`,
  });
};

/**
 * @deprecated
 * @param md - Markdown-it instance
 */
export const mdDemo: PluginSimple = (md) => {
  md.use(demo, {
    name: "md-demo",
    openRenderer: (tokens, index) => {
      logger.warn("md-demo container is deprecated, you should use preview container instead.");

      return `<MdDemo title="${escapeHtml(tokens[index].info)}" id="md-demo-${index}">\n`;
    },
    // oxlint-disable-next-line max-params
    codeRenderer: (tokens, index, options, _env, self) =>
      // oxlint-disable-next-line typescript/no-non-null-assertion
      `<template #code>\n${self.rules.fence!(tokens, index, options, _env, self)}</template>\n`,
    contentOpenRenderer: () => `<template #default>\n`,
    contentCloseRenderer: () => `</template>\n`,
    closeRenderer: () => "</MdDemo>\n",
  });
};
