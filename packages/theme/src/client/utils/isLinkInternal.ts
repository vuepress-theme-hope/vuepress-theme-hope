import { isLinkExternal, isLinkWithProtocol } from "@vuepress/helper/client";

export const isLinkInternal = (link: string): boolean =>
  !isLinkWithProtocol(link) && !isLinkExternal(link);
