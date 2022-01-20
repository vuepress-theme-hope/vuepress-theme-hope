import { ensureLeadingSlash, resolveLocalePath } from "@vuepress/shared";

import type { LocaleConfig } from "@vuepress/core";
import type Token from "markdown-it/lib/token";
import type { MarkdownItContainerRenderFunction } from "@vuepress/plugin-container";

export const getDetailsRender =
  (
    locales: LocaleConfig<{
      defaultInfo: string;
    }>
  ): MarkdownItContainerRenderFunction =>
  (tokens: Token[], index, _options, env): string => {
    const token = tokens[index];

    if (token.nesting === 1) {
      // `before` tag

      // resolve info (title)
      let info = token.info
        .trim()
        .slice(
          // length of "details"
          7
        )
        .trim();

      if (!info && locales) {
        // locale
        const { filePathRelative } = env;
        const relativePath = ensureLeadingSlash(filePathRelative ?? "");

        const localePath = resolveLocalePath(locales, relativePath);
        const localeData = locales[localePath] ?? {};

        info = localeData.defaultInfo || "Details";
      }

      return `<details class="custom-block details"><summary>${
        info || "Details"
      }</summary>\n`;
    }

    return "</details>\n";
  };
