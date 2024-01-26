import type { ClientConfig } from "vuepress/client";
import { defineClientConfig } from "vuepress/client";
import { hasGlobalComponent } from "vuepress-shared/client";

import AutoCatalog from "./components/AutoCatalog.js";
import { injectAutoCatalogGetter } from "./helpers/index.js";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default <ClientConfig>defineClientConfig({
  enhance: ({ app }) => {
    injectAutoCatalogGetter(app);
    if (!hasGlobalComponent("AutoCatalog", app))
      app.component("AutoCatalog", AutoCatalog);
  },
});
