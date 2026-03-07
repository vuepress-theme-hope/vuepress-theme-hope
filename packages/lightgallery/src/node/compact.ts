import { colors } from "vuepress/utils";
import { createConverter } from "vuepress-shared";

/**
 * @deprecated You should use `defineLightGalleryConfig` from `vuepress-plugin-lightgallery/client` instead
 *
 * @param options - User options
 */
export const convertOptions = (options: Record<string, unknown>): void => {
  const { droppedLogger } = createConverter("lightgallery");

  droppedLogger({
    options,
    old: "options",
    msg: `Please import and use ${colors.cyan(
      "defineLightGalleryConfig",
    )} from ${colors.magenta("vuepress-plugin-lightgallery/client")} instead.`,
  });
};
