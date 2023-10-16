import { createRequire } from "node:module";

import { getDirname, path } from "@vuepress/utils";
import { Logger, ensureEndingSlash } from "vuepress-shared/node";

const __dirname = getDirname(import.meta.url);
const require = createRequire(import.meta.url);

export const PLUGIN_NAME = "vuepress-plugin-md-enhance";

export const logger = new Logger(PLUGIN_NAME);

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../client"),
);

export const isInstalled = (pkg: string, hint = true): boolean => {
  try {
    require.resolve(pkg);

    return true;
  } catch (error) {
    if (hint) logger.error(`Package ${pkg} is not installed.`);

    return false;
  }
};
