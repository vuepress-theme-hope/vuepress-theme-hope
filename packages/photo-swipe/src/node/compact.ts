import { colors } from "@vuepress/utils";
import { createConverter } from "vuepress-shared/node";

/** @deprecated */
export const convertOptions = (options: Record<string, unknown>): void => {
  const { droppedLogger, deprecatedLogger } = createConverter("photo-swipe");

  deprecatedLogger({
    options,
    old: "locale",
    new: "locales",
  });
  droppedLogger({
    options,
    old: "options",
    msg: `Please import and use ${colors.cyan(
      "definePhotoSwipeConfig",
    )} from ${colors.magenta("vuepress-plugin-photo-swipe/client")} instead.`,
  });
};
