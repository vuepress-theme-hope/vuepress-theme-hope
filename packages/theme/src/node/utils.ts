import { getDirname, path } from "@vuepress/utils";
import { ensureEndingSlash } from "@vuepress/shared";
import { Logger } from "vuepress-shared/node";

const __dirname = getDirname(import.meta.url);

export const logger = new Logger("vuepress-theme-hope");

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../client")
);
export const TEMPLATE_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../../templates")
);
