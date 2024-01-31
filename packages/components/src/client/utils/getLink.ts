import { isLinkHttp } from "@vuepress/helper/client";
import { withBase } from "vuepress/client";

export const getLink = (url: string): string =>
  isLinkHttp(url) ? url : withBase(url);
