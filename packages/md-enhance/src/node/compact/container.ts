import { container } from "@mdit/plugin-container";
import type { MarkdownEnv } from "@vuepress/markdown";
import { resolveLocalePath } from "@vuepress/shared";
import { colors } from "@vuepress/utils";
import type { PluginWithOptions } from "markdown-it";
import { ensureLeadingSlash } from "vuepress-shared/node";

import type { MarkdownItHintOptions } from "../markdown-it/index.js";
import { logger } from "../utils.js";

/** @deprecated */
export const legacyHint: PluginWithOptions<MarkdownItHintOptions> = (
  md,
  options = {},
) => {
  md.use(container, {
    name: "danger",
    openRender: (tokens, index, _options, env: MarkdownEnv): string => {
      const token = tokens[index];

      // resolve info (title)
      let info = token.info.trim().slice(6).trim();

      // get locale
      if (!info) {
        const { filePathRelative } = env;
        const relativePath = ensureLeadingSlash(filePathRelative ?? "");
        const localePath = resolveLocalePath(options, relativePath);

        info = options[localePath]?.caution;
      }

      logger.warn(
        `${colors.cyan(
          "danger",
        )} hint box is deprecated, please use ${colors.cyan(
          "caution",
        )} instead.`,
      );

      return `<div class="hint-container caution">\n<p class="hint-container-title">${
        info || "caution"
      }</p>\n`;
    },
    closeRender: () => "</div>\n",
  });
};
