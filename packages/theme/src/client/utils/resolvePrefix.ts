import {
  ensureEndingSlash,
  isLinkAbsolute,
  isLinkWithProtocol,
} from "@vuepress/helper/client";

export const resolvePrefix = (prefix = "", path = ""): string =>
  isLinkWithProtocol(path) || isLinkAbsolute(path)
    ? path
    : `${ensureEndingSlash(prefix)}${path}`;
