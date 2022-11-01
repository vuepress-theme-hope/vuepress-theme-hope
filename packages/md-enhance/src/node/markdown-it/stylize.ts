import type { MarkdownEnv } from "@vuepress/markdown";
import type { PageFrontmatter } from "@vuepress/shared";
import type { PluginWithOptions } from "markdown-it";
import type { default as Token } from "markdown-it/lib/token.js";
import type { StylizeOptions } from "../../shared/index.js";

export interface StylizeFrontmatter {
  /**
   * Content to be skipped in this page
   */
  noStylize?: string[];
}

export interface StylizeMarkdownEnv extends MarkdownEnv {
  frontmatter: PageFrontmatter<StylizeFrontmatter>;
}

const scanTokens = (
  tokens: Token[],
  options: StylizeOptions,
  skipContents: string[] = []
): void => {
  for (let index = 1, len = tokens.length; index < len - 1; index++) {
    const token = tokens[index];
    const { content, type } = token;

    // skip current token
    if (type !== "text" || skipContents.includes(content)) continue;

    const config = options.find(({ matcher }) =>
      typeof matcher === "string" ? matcher === content : matcher.test(content)
    );
    const tokenPrev = tokens[index - 1];
    const tokenNext = tokens[index + 1];

    if (
      config &&
      tokenPrev.tag === tokenNext.tag &&
      tokenPrev.nesting === 1 &&
      tokenNext.nesting === -1
    ) {
      const result = config.replacer({
        tag: tokenPrev.tag,
        content: token.content,
        attrs: Object.fromEntries(tokenPrev.attrs || []),
      });

      if (result) {
        tokenPrev.tag = tokenNext.tag = result.tag;
        tokenPrev.attrs = Object.entries(result.attrs);
        token.content = result.content;
      }

      // skip 2 tokens
      index += 2;
    }
  }
};

export const stylize: PluginWithOptions<StylizeOptions> = (
  md,
  options = []
) => {
  if (Object.keys(options).length == 0) return;

  md.core.ruler.push("stylize_tag", ({ env, tokens }) => {
    const { noStylize } = (<StylizeMarkdownEnv>env).frontmatter || {};

    tokens.forEach(({ type, children }) => {
      if (type === "inline") scanTokens(children || [], options, noStylize);
    });
  });
};
