import { ensureEndingSlash } from "@vuepress/shared";
import { getDirname, path } from "@vuepress/utils";
import { Logger } from "vuepress-shared/node";

const __dirname = getDirname(import.meta.url);

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../client")
);

export const COMMENT_PROVIDERS = ["Artalk", "Giscus", "Waline", "Twikoo"];

export const logger = new Logger("vuepress-plugin-comment2");
