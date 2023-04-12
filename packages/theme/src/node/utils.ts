import { createRequire } from "node:module";

import { getDirname, path } from "@vuepress/utils";
import { Logger, ensureEndingSlash } from "vuepress-shared/node";

const __dirname = getDirname(import.meta.url);

export const logger = new Logger("vuepress-theme-hope");

export const BUNDLE_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../bundle")
);

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../client")
);

export const TEMPLATE_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../../templates")
);

export const VERSION = (<Record<string, unknown> & { version: string }>(
  createRequire(import.meta.url)("vuepress-theme-hope/package.json")
)).version;
