import { ensureEndingSlash, isAbsoluteUrl } from "vuepress-shared/client";

export const resolvePrefix = (prefix = "", path = ""): string =>
  isAbsoluteUrl(path) ? path : `${ensureEndingSlash(prefix)}${path}`;
