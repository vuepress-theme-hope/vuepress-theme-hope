import { defineClientConfig } from "@vuepress/client";
import { defineAsyncComponent } from "vue";
import { hasGlobalComponent } from "vuepress-shared/client";

declare const SHOULD_REGISTER_AUTO_CATALOG_COMPONENT: boolean;

export default defineClientConfig({
  enhance: ({ app }) => {
    if (
      SHOULD_REGISTER_AUTO_CATALOG_COMPONENT &&
      !hasGlobalComponent("AutoCatalog", app)
    )
      app.component(
        "AutoCatalog",
        defineAsyncComponent(
          () =>
            import("vuepress-plugin-components/client/components/Catalog.js")
        )
      );
  },
});
