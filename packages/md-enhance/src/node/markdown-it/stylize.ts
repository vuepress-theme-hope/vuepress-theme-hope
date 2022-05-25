/**
 * 对 <tag>text</tag> 形式的 token 组合（inline），进行显示增强：
 * ①对 tag 增加属性（如 class 样式）②对 text 进行替换（如 Emoji 后缀）。
 * 其主要目的是使特定词汇具在 render 后，变得更醒目或生动。
 * 可以通过 front matter 设置 noStylize:[t1,t2] 禁用 t1 和 t2 的增强。
 * 注意，所有配置项都区分大小写。
 *
 * @author trydofor
 * @since 2022-05-20
 * @see https://markdown-it.github.io
 */

import type { default as Token } from "markdown-it/lib/token";
import type { PluginWithOptions } from "markdown-it";
import type { StylizeOption } from "../../shared";
import type { MarkdownEnv } from "@vuepress/markdown";

const scanTokens = (
  tokens: Token[],
  skips: string[],
  options: StylizeOption,
  env: MarkdownEnv
): void => {
  for (let i = 0, len = tokens.length - 2; i < len; i++) {
    const txt = tokens[i + 1];

    if (txt.type !== "text") continue;

    const kw = txt.content;

    if (skips.includes(kw)) {
      // front matter contains
      continue;
    }

    const tagOpen = tokens[i];
    const tagClose = tokens[i + 2];
    const opt = options[kw];

    if (
      opt != null &&
      opt.tag.includes(tagOpen.tag) &&
      tagOpen.type.endsWith("_open") &&
      tagOpen.tag === tagClose.tag &&
      tagClose.type.endsWith("_close")
    ) {
      i += 2; // deal and skip
    } else {
      continue;
    }

    if (opt.attr) {
      for (const ar of opt.attr) {
        if (ar[0] === "class" || ar[0] === "style") {
          tagOpen.attrJoin(ar[0], ar[1]);
        } else {
          tagOpen.attrSet(ar[0], ar[1]);
        }
      }
    }

    const repl =
      typeof opt.text === "function"
        ? opt.text(kw, env)
        : typeof opt.text === "string"
        ? opt.text
        : "";

    if (repl) {
      txt.content = repl;
    }
  }
};

export const stylize: PluginWithOptions<StylizeOption> = (md, options = {}) => {
  if (Object.keys(options).length == 0) return;

  md.core.ruler.push("stylize_tag", (state) => {
    const env = state.env as MarkdownEnv;
    const matter = env.frontmatter?.noStylize;
    const skips = (Array.isArray(matter) ? matter : []) as string[];

    for (const token of state.tokens) {
      if (token.type === "inline") {
        scanTokens(token.children || [], skips, options, env);
      }
    }
  });
};
