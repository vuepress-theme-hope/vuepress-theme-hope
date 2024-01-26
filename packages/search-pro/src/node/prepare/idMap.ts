import type { App } from "vuepress/core";
import { fromEntries } from "vuepress-shared/node";

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
