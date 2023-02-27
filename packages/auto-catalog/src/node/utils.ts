import { ensureEndingSlash } from "@vuepress/shared";
import { getDirname, path } from "@vuepress/utils";
import { Logger } from "vuepress-shared/node";

const __dirname = getDirname(import.meta.url);

export const PLUGIN_NAME = "vuepress-plugin-auto-catalog";

export const logger = new Logger(PLUGIN_NAME);

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../client")
);
