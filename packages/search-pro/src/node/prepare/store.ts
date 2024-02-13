import type { App } from "vuepress/core";

import type { Store } from "../utils.js";

export const prepareStore = async (app: App, store: Store): Promise<void> => {
  await app.writeTemp(
    `search-pro/store.js`,
    `\
export const store = ${store.toJSON()};
`,
  );
};
