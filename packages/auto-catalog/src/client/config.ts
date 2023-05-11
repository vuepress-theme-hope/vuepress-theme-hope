import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "vuepress-shared/client";

import AutoCatalog from "./components/AutoCatalog.js";
import { injectAutoCatalogIconComponent } from "./helpers/index.js";

export default defineClientConfig({
  enhance: ({ app }) => {
    injectAutoCatalogIconComponent(app);
    if (!hasGlobalComponent("AutoCatalog", app))
      app.component("AutoCatalog", AutoCatalog);
  },
});
