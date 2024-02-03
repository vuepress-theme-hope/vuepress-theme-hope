import { container } from "@mdit/plugin-container";
import type { ExactLocaleConfig } from "@vuepress/helper";
import { ensureLeadingSlash } from "@vuepress/helper";
import type { PluginWithOptions } from "markdown-it";
import type { MarkdownEnv } from "vuepress/markdown";
import { resolveLocalePath } from "vuepress/shared";

import type { MarkdownHintLocaleData } from "../typings/index.js";

export type MarkdownItHintOptions = ExactLocaleConfig<MarkdownHintLocaleData>;

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
    "caution",
    "important",
  ];

  containers.forEach((name) => {
    md.use(container, {
      name,
      openRender: (tokens, index, _options, env: MarkdownEnv): string => {
        const token = tokens[index];

        // Resolve info (title)
        let info = token.info.trim().slice(name.length).trim();

        // Get locale
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

  // Compact with @vuepress/theme-default
  md.use(container, {
    name: "danger",
    openRender: (tokens, index, _options, env: MarkdownEnv): string => {
      const token = tokens[index];

      // Resolve info (title)
      let info = token.info.trim().slice(6).trim();

      // Get locale
      if (!info) {
        const { filePathRelative } = env;
        const relativePath = ensureLeadingSlash(filePathRelative ?? "");
        const localePath = resolveLocalePath(options, relativePath);

        info = options[localePath]?.caution;
      }

      return `<div class="hint-container caution">\n<p class="hint-container-title">${
        info || "caution"
      }</p>\n`;
    },
    closeRender: () => "</div>\n",
  });

  md.use((md) =>
    container(md, {
      name: "details",
      openRender: (tokens, index, _options, env: MarkdownEnv): string => {
        const token = tokens[index];

        // Resolve info (title)
        let info = token.info
          .trim()
          .slice(
            // Length of "details"
            7,
          )
          .trim();

        // Get locale
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
