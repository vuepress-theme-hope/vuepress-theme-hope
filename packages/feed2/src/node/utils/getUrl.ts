import {
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from "vuepress-shared/node";

export const getUrl = (hostname: string, base = "", path = ""): string =>
  `${
    isLinkHttp(hostname)
      ? removeEndingSlash(hostname)
      : `https://${removeEndingSlash(hostname)}`
  }${base}${removeLeadingSlash(path)}`;
