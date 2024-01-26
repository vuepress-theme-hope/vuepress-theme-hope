import { withBase } from "vuepress/client";
import { isLinkHttp } from "vuepress-shared/client";

export const getLink = (url: string): string =>
  isLinkHttp(url) ? url : withBase(url);
