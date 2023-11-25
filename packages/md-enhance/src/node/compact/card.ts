import { container } from "@mdit/plugin-container";
import type { MarkdownEnv } from "@vuepress/markdown";
import { load } from "js-yaml";
import type { Options, PluginSimple } from "markdown-it";
import type Token from "markdown-it/lib/token.js";
import {
  entries,
  fromEntries,
  isPlainObject,
  isString,
} from "vuepress-shared/node";

import { stringifyProp } from "../markdown-it/utils.js";
import { logger } from "../utils.js";

export interface CardOptions {
  title: string;
  desc?: string;
  logo?: string;
  link?: string;
  color?: string;
}

const CARD_PROPS = ["title", "desc", "logo", "link", "color"];

const checkCardProps = (config: unknown): CardOptions | null => {
  if (isPlainObject(config) && isString(config["title"]))
    return fromEntries(
      entries(config).filter(
        (item): item is [string, string] =>
          CARD_PROPS.includes(item[0]) && isString(item[1]),
      ),
    ) as unknown as CardOptions;

  return null;
};

const cardRender = (
  tokens: Token[],
  index: number,
  _options: Options,
  { filePathRelative }: MarkdownEnv,
): string => {
  const token = tokens[index];
  const { content } = token;

  let config: unknown = null;

  if (content.trim().startsWith("{"))
    try {
      config = <unknown>JSON.parse(content);
    } catch (err) {
      // do nothing
      logger.error(`Parsing card as JSON config failed:`, err);
    }
  else
    try {
      config = load(content);
    } catch (err) {
      logger.error(`Parsing card as YAML config failed:`, err);
    }

  const cardData = checkCardProps(config);

  if (cardData) return `<VPCard v-bind='${stringifyProp(cardData)}' />`;

  logger.error(
    `Invalid card config${
      filePathRelative ? ` found in ${filePathRelative}` : ""
    }:
${content}
`,
  );

  return "";
};

/** @deprecated */
export const legacyCard: PluginSimple = (md) => {
  // add card container
  md.use(container, {
    name: "card",
    openRender: () =>
      `\
<div class="vp-card-container">
`,
  });

  // Handle ```card  blocks
  const fence = md.renderer.rules.fence;

  md.renderer.rules.fence = (...args): string => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [tokens, index, options, env] = args;
    const { info } = tokens[index];

    if (info === "card")
      return cardRender(tokens, index, options, <MarkdownEnv>env);

    const realInfo = info.split(":", 2)[0];

    if (realInfo === "card") {
      logger.warn(
        "Language declaration for card is deprecated, please remove them.",
      );

      return cardRender(tokens, index, options, <MarkdownEnv>env);
    }

    return fence!(...args);
  };

  md.renderer.rules["card"] = cardRender;
};
