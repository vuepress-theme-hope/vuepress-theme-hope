import { withBase } from "@vuepress/client";
import { isLinkHttp } from "@vuepress/shared";

export const getLink = (url: string): string =>
  isLinkHttp(url) ? url : withBase(url);
