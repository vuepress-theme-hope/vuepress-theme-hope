import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "vuepress-shared/client";

import AutoCatalog from "./components/AutoCatalog.js";
import { injectAutoCatalogGetter } from "./helpers/index.js";

export default defineClientConfig({
  enhance: ({ app }) => {
    injectAutoCatalogGetter(app);
    if (!hasGlobalComponent("AutoCatalog", app))
      app.component("AutoCatalog", AutoCatalog);
  },
});
