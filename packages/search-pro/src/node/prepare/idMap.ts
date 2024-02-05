import { fromEntries } from "@vuepress/helper";
import type { App } from "vuepress/core";

export const prepareIdMap = async (app: App) => {
  await app.writeTemp(
    "search-pro/idMap.js",
    `\
export const idMap = ${JSON.stringify(
      fromEntries(app.pages.map(({ key, path }) => [key, path]))
    )}
`
  );
};
