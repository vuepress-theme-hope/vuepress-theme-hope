import { type App } from "@vuepress/core";
import { colors } from "@vuepress/utils";

import { COMMENT_PROVIDERS, logger } from "./utils.js";
import { type CommentOptions } from "../shared/index.js";

export const applyDemo = (options: CommentOptions, app: App): void => {
  const { isDev } = app.env;

  options.provider =
    options.provider && COMMENT_PROVIDERS.includes(options.provider)
      ? options.provider
      : "None";

  switch (options.provider) {
    case "Artalk":
      if (!options.server)
        if (isDev) {
          logger.info(
            `A fallback Artalk server is used ${colors.red(
              "for demo only"
            )}. You should provide ${colors.magenta(
              "server"
            )} option yourself in production.`
          );

          options.site = "artalk-demo";
          options.server = "https://demo-artalk.jjdxb.top/";
        } else {
          logger.error(`${colors.magenta("site")} is required for Artalk.`);
        }

      break;

    case "Giscus":
      if (
        !options.repo &&
        !options.repoId &&
        !options.category &&
        !options.categoryId &&
        isDev
      ) {
        logger.info(
          `A fallback GitHub repo is used ${colors.red(
            "for demo only"
          )}. You should provide ${colors.magenta("repo")}, ${colors.magenta(
            "repoId"
          )}, ${colors.magenta("category")} and ${colors.magenta(
            "categoryId"
          )} option yourself in production.`
        );

        options.repo = "vuepress-theme-hope/giscus-discussions";
        options.repoId = "R_kgDOG_Pt2A";
        options.category = "Announcements";
        options.categoryId = "DIC_kwDOG_Pt2M4COD69";
      } else {
        if (!options.repo)
          logger.error(`${colors.magenta("repo")} is required for Giscus.`);
        if (!options.repoId)
          logger.error(`${colors.magenta("repoId")} is required for Giscus.`);
        if (!options.category)
          logger.error(`${colors.magenta("category")} is required for Giscus.`);
        if (!options.categoryId)
          logger.error(
            `${colors.magenta("categoryId")} is required for Giscus.`
          );
      }

      break;

    case "Waline":
      if (!options.serverURL)
        if (isDev) {
          options.serverURL = "https://waline-comment.vuejs.press";

          logger.info(
            `A fallback Waline server is used ${colors.red(
              "for demo only"
            )}. You should provide ${colors.magenta(
              "serverURL"
            )} option yourself in production.`
          );
        } else {
          logger.error(
            `${colors.magenta("serverURL")} is required for Waline.`
          );
        }

      break;

    case "Twikoo":
      if (!options.envId)
        if (isDev) {
          logger.info(
            `A fallback Twikoo server is used ${colors.red(
              "for demo only"
            )}. You should provide ${colors.magenta(
              "envId"
            )} option yourself in production.`
          );

          options.envId = "https://twikoo.ccknbc.vercel.app";
        } else {
          logger.error(`${colors.magenta("envId")} is required for Twikoo.`);
        }

      break;
  }
};
