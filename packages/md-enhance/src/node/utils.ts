import {
  Logger,
  ensureEndingSlash,
  getInstalledStatus,
} from "@vuepress/helper";
import { getDirname, path } from "vuepress/utils";

const __dirname = getDirname(import.meta.url);

export const PLUGIN_NAME = "vuepress-plugin-md-enhance";

export const logger = new Logger(PLUGIN_NAME);

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../client"),
);

export const isInstalled = (pkg: string, hint = true): boolean => {
  const isInstalled = getInstalledStatus(pkg, import.meta.url);

  if (hint && !isInstalled)
    logger.error(
      `Package ${pkg} is not installed, please install it manually!`,
    );

  return isInstalled;
};
