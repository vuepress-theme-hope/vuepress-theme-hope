import { ensureEndingSlash } from "@vuepress/shared";
import { isAbsoluteUrl } from "vuepress-shared/node";

export const resolvePrefix = (prefix = "", path = ""): string =>
  isAbsoluteUrl(path) ? path : `${ensureEndingSlash(prefix)}${path}`;
