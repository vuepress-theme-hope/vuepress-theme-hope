import { Logger, removeEndingSlash } from "@vuepress/helper";
import { getDirname, path } from "vuepress/utils";

import pkg from "../../package.json" with { type: "json" };

const __dirname = getDirname(import.meta.url);

export const logger = new Logger("vuepress-theme-hope");

export const BUNDLE_FOLDER = removeEndingSlash(
  path.resolve(__dirname, "../bundle"),
);

export const CLIENT_FOLDER = removeEndingSlash(
  path.resolve(__dirname, "../client"),
);

export const TEMPLATE_FOLDER = removeEndingSlash(
  path.resolve(__dirname, "../../templates"),
);

export const VERSION = pkg.version;
