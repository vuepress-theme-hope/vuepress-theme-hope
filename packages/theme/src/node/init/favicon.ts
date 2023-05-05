import { type App } from "@vuepress/core";
import { isLinkHttp } from "vuepress-shared/node";

export const addFavicon = (app: App, favicon: string): void => {
  const { base, head } = app.options;
  const faviconLink = isLinkHttp(favicon)
    ? favicon
    : favicon.replace(/^\/?/, base);

  // ensure favicon is not injected
  if (
    head.every(
      ([tag, attrs]) =>
        !(
          tag === "link" &&
          attrs["rel"] === "icon" &&
          attrs["href"] === faviconLink
        )
    )
  )
    head.push(["link", { rel: "icon", href: faviconLink }]);
};
