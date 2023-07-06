import { container } from "@mdit/plugin-container";
import type { MarkdownEnv } from "@vuepress/markdown";
import { resolveLocalePath } from "@vuepress/shared";
import type { PluginWithOptions } from "markdown-it";
import type { RequiredLocaleConfig } from "vuepress-shared/node";
import { ensureLeadingSlash } from "vuepress-shared/node";

import type { MarkdownHintLocaleData } from "../typings/index.js";

export type MarkdownItHintOptions =
  RequiredLocaleConfig<MarkdownHintLocaleData>;

export type MarkdownHintBoxName = keyof MarkdownHintLocaleData;

export const hint: PluginWithOptions<MarkdownItHintOptions> = (
  md,
  options = {},
) => {
  const containers: MarkdownHintBoxName[] = [
    "info",
    "note",
    "tip",
    "warning",
    "danger",
  ];

  containers.forEach((name) => {
    md.use(container, {
      name,
      openRender: (tokens, index, _options, env: MarkdownEnv): string => {
        const token = tokens[index];

        // resolve info (title)
        let info = token.info.trim().slice(name.length).trim();

        // get locale
        if (!info) {
          const { filePathRelative } = env;
          const relativePath = ensureLeadingSlash(filePathRelative ?? "");
          const localePath = resolveLocalePath(options, relativePath);

          info = options[localePath]?.[name];
        }

        return `<div class="hint-container ${name}">\n<p class="hint-container-title">${
          info || name
        }</p>\n`;
      },
      closeRender: () => "</div>\n",
    });
  });

  md.use((md) =>
    container(md, {
      name: "details",
      openRender: (tokens, index, _options, env: MarkdownEnv): string => {
        const token = tokens[index];

        // resolve info (title)
        let info = token.info
          .trim()
          .slice(
            // length of "details"
            7,
          )
          .trim();

        // get locale
        if (!info) {
          const { filePathRelative } = env;
          const relativePath = ensureLeadingSlash(filePathRelative ?? "");
          const localePath = resolveLocalePath(options, relativePath);

          info = options[localePath]?.details;
        }

        return `<details class="hint-container details"><summary>${
          info || "Details"
        }</summary>\n`;
      },
      closeRender: () => "</details>\n",
    }),
  );
};
