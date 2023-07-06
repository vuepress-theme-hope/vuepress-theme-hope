import { colors } from "@vuepress/utils";

import type { CommentPluginOptions } from "./options.js";
import { logger } from "./utils.js";

/** @deprecated */
export const convertOptions = (
  options: CommentPluginOptions & {
    /** @deprecated */
    type?: "waline" | "giscus" | "twikoo" | "none";
  },
): void => {
  // v2 changes
  if ("type" in options) {
    logger.warn(
      `${colors.magenta(
        "iconComponent",
      )} is deprecated, please use ${colors.magenta("provider")}.`,
    );
    if (options["type"] === "waline") options.provider = "Waline";
    else if (options["type"] === "giscus") options.provider = "Giscus";
    else if (options["type"] === "twikoo") options.provider = "Twikoo";

    delete options["type"];
  }

  // convert Waline options
  if (options.provider === "Waline") {
    [
      // valine
      ["emojiCDN", "emoji"],
      ["emojiMaps", "emoji"],
      ["requiredFields", "requiredMeta"],
      ["visitor", "pageview"],
      ["langMode", "locale"],
      ["placeholder", "locale.placeholder"],

      // waline v1
      ["anonymous", "login"],
      ["copyRight", "copyright"],
    ].forEach(([oldOptions, newOptions]) => {
      if (oldOptions in options) {
        logger.warn(
          `"${colors.magenta(
            oldOptions,
          )}" is deprecated in @waline/client@v2, you should use "${colors.magenta(
            newOptions,
          )}" instead.`,
        );

        // @ts-ignore
        delete options[oldOptions];
      }
    });

    [
      // valine
      "region",
      "appId",
      "appKey",
      "notify",
      "verify",
      "avatar",
      "avatarForce",
      "enableQQ",
      "recordIP",
      "serverURLs",

      // waline v1
      "avatarCDN",
      "mathTagSupport",
      "highlight",
      "uploadImage",
      "previewMath",
    ].forEach((option) => {
      if (option in options) {
        logger.error(
          `"${colors.magenta(
            option,
          )}" is no longer supported in @waline/client@v2.`,
        );

        // @ts-expect-error
        delete options[option];
      }
    });
  }
};
