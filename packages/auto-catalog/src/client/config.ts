import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "vuepress-shared/client";
import Catalog from "vuepress-plugin-components/client/components/Catalog.js";

export default defineClientConfig({
  enhance: ({ app }) => {
    if (!hasGlobalComponent("AutoCatalog", app))
      app.component("AutoCatalog", Catalog);
  },
});
