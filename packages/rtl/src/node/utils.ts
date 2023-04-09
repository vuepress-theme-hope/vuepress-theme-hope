import { getDirname, path } from "@vuepress/utils";
import { ensureEndingSlash } from "vuepress-shared/node";

const __dirname = getDirname(import.meta.url);

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../client")
);
