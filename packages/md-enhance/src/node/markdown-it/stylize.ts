/**
 * 对<tag>text</tag>形式的token组合(inline)，进行显示增强：
 * ①对tag增加属性（如class样式）②对text进行替换（如Emoji后缀）。
 * 其主要目的是使特定词汇具在render后，变得更醒目或生动。
 * 可以通过front matter设置 noStylize:[t1,t2]禁用t1和t2的增强。
 * 注意，所有配置项都区分大小写。
 *
 * @author trydofor
 * @since 2022-05-20
 * @see https://markdown-it.github.io
 */

import * as Token from "markdown-it/lib/token";
import { PluginWithOptions } from "markdown-it";
import { StylizeOption } from "../../shared";
import { MarkdownEnv } from "@vuepress/markdown";

function scan(
  tokens: Token[],
  skips: string[],
  options: StylizeOption,
  env: MarkdownEnv
): void {
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
}

export const stylize: PluginWithOptions<StylizeOption> = (md, options) => {
  if (options == null || Object.keys(options).length == 0) return;

  md.core.ruler.push("stylize-tag", (state) => {
    const env = state.env as MarkdownEnv;
    const matter = env.frontmatter?.noStylize;
    const skips = (Array.isArray(matter) ? matter : []) as string[];

    for (const token of state.tokens) {
      if (token.type === "inline") {
        scan(token.children || [], skips, options, env);
      }
    }
  });
};
