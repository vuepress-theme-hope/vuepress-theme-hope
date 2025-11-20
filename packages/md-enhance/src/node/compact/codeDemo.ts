import { container } from "@mdit/plugin-container";
import { demo } from "@mdit/plugin-demo";
import { encodeData } from "@vuepress/helper";
import type { PluginSimple } from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";

import { escapeHtml } from "../markdown-it/utils.js";
import { logger } from "../utils.js";

/** @deprecated */
export const legacyCodeDemo: PluginSimple = (md) => {
  md.use(container, {
    name: "demo",
    openRender: (tokens: Token[], index: number): string => {
      logger.warn(
        "demo container is deprecated, you should use normal-demo, react-demo and vue-demo container instead.",
      );

      const { info } = tokens[index];
      const type = /\[(.*)\]/u.exec(info);
      const title = /^ demo\s*(?:\[.*?\])?\s*(.*)\s*$/u.exec(info);

      let config = "";
      const code: Record<string, string> = {};

      for (let i = index; i < tokens.length; i++) {
        const { type, content, info } = tokens[i];
        const language = info
          ? (/^([^ :[{]+)/.exec(md.utils.unescapeAll(info).trim())?.[1] ??
            "text")
          : "";

        if (type === `container_demo_close`) break;
        if (!content) continue;
        if (type === "fence")
          if (language === "json") config = encodeData(content);
          else code[language] = content;
      }

      return `
<CodeDemo id="code-demo-${index}" type="${type?.[1] ?? "normal"}"${
        title ? ` title="${encodeURIComponent(title[1])}"` : ""
      }${config ? ` config="${config}"` : ""} code="${encodeData(
        JSON.stringify(code),
      )}">
`;
    },
    closeRender: () => `</CodeDemo>`,
  });
};

/** @deprecated */
export const mdDemo: PluginSimple = (md) => {
  md.use(demo, {
    name: "md-demo",
    openRender: (tokens, index) => {
      logger.warn(
        "md-demo container is deprecated, you should use preview container instead.",
      );

      return `<MdDemo title="${escapeHtml(
        tokens[index].info,
      )}" id="md-demo-${index}">\n`;
    },
    // oxlint-disable-next-line max-params
    codeRender: (tokens, index, options, _env, self) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      `<template #code>\n${self.rules.fence!(
        tokens,
        index,
        options,
        _env,
        self,
      )}</template>\n`,
    contentOpenRender: () => `<template #default>\n`,
    contentCloseRender: () => `</template>\n`,
    closeRender: () => "</MdDemo>\n",
  });
};
