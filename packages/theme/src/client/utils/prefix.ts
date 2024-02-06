import { ensureEndingSlash, isLinkAbsolute } from "@vuepress/helper/client";

export const resolvePrefix = (prefix = "", path = ""): string =>
  isLinkAbsolute(path) ? path : `${ensureEndingSlash(prefix)}${path}`;
