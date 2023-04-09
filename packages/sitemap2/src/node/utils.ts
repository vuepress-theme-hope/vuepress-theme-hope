import { getDirname, path } from "@vuepress/utils";
import { Logger, ensureEndingSlash } from "vuepress-shared/node";

const __dirname = getDirname(import.meta.url);

export const TEMPLATE_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../../templates")
);

export const PLUGIN_NAME = "vuepress-plugin-sitemap2";

export const logger = new Logger(PLUGIN_NAME);
