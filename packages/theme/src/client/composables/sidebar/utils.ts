import { ensureEndingSlash } from "@vuepress/shared";

export const resolvePrefix = (prefix = "", path = ""): string =>
  path.startsWith("/") ? path : `${ensureEndingSlash(prefix)}${path}`;
