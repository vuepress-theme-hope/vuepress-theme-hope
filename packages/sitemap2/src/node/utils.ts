import { ensureEndingSlash } from "@vuepress/shared";
import { getDirname, path } from "@vuepress/utils";
import { Logger } from "vuepress-shared/node";

const __dirname = getDirname(import.meta.url);

export const TEMPLATE_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../../templates")
);

export const logger = new Logger("vuepress-plugin-sitemap2");
