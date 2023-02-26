import { ensureEndingSlash } from "@vuepress/shared";
import { getDirname, path } from "@vuepress/utils";
import { Logger } from "vuepress-shared/node";

const __dirname = getDirname(import.meta.url);

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../client/")
);

export const WORKER_PATH = path.resolve(__dirname, "../worker/index.js");

export const logger = new Logger("vuepress-plugin-search-pro");
