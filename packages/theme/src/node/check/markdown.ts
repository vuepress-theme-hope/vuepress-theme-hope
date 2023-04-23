import { HeadersPluginOptions, type MarkdownOptions } from "@vuepress/markdown";
import { colors } from "@vuepress/utils";
import { isArray, values } from "vuepress-shared/node";

import { type ThemeData } from "../../shared/index.js";
import { logger } from "../utils.js";

export const checkHeader = (
  markdownOptions: MarkdownOptions,
  themeData: ThemeData
): void => {
  const headerDepth =
    values(themeData.locales)
      .map(({ headerDepth }) => headerDepth)
      .sort((a = 2, b = 2) => b - a)
      .pop() ?? 2;

  // check anchor level
  if (markdownOptions.anchor) {
    const { level } = markdownOptions.anchor;

    if (
      typeof level === "number" ||
      (isArray(level) &&
        Array.from({ length: headerDepth + 1 }, (_, index) => index + 1).some(
          (_, index) => !level.includes(index + 1)
        ))
    ) {
      logger.warn(
        `Max ${colors.magenta(
          "headerDepth"
        )} is ${headerDepth}, but ${colors.magenta(
          "markdown.anchor.level"
        )} is ${JSON.stringify(
          level
        )}, which does not extract header level ${headerDepth}.`
      );

      markdownOptions.anchor.level = Array.from(
        { length: headerDepth + 1 },
        (_, index) => index + 1
      );
    }
  } else if (markdownOptions.anchor === false && headerDepth !== 0) {
    logger.error(
      `MarkdownIt anchor plugin is disabled, which will not extract any header. You should enable it.`
    );

    delete markdownOptions.anchor;
  }

  // check headers level
  if (markdownOptions.headers === false) {
    if (headerDepth !== 0) {
      logger.error(
        `MarkdownIt header plugin is disabled, which will not extract any header. You should enable it.`
      );

      markdownOptions.headers = {
        level: Array.from({ length: headerDepth }, (_, index) => index + 2),
      };
    }
  } else {
    const { level = [2, 3] } = <HeadersPluginOptions>(
      (markdownOptions.headers ??= {})
    );

    if (
      Array.from({ length: headerDepth }, (_, index) => index + 2).some(
        (item) => !level.includes(item)
      )
    ) {
      logger.warn(
        `Max ${colors.magenta(
          "headerDepth"
        )} is ${headerDepth}, but ${colors.magenta(
          "markdown.headers.level"
        )} is ${JSON.stringify(
          level
        )}, which does not extract header level ${headerDepth}.`
      );

      markdownOptions.headers.level = Array.from(
        { length: headerDepth },
        (_, index) => index + 2
      );
    }
  }
};
