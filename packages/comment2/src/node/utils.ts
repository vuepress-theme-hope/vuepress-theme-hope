import { getDirname, path } from "@vuepress/utils";
import { Logger, ensureEndingSlash } from "vuepress-shared/node";

const __dirname = getDirname(import.meta.url);

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../client"),
);

export const COMMENT_PROVIDERS = ["Artalk", "Giscus", "Waline", "Twikoo"];

export const PLUGIN_NAME = "vuepress-plugin-comment2";

export const logger = new Logger(PLUGIN_NAME);

export const getPackage = (provider?: string): string | null => {
  switch (provider) {
    case "Artalk":
      return "artalk";
    case "Twikoo":
      return "twikoo";
    case "Waline":
      return "@waline/client";

    default:
      return null;
  }
};
