import { defineClientConfig } from "@vuepress/client";
import { type VNode, h, resolveComponent } from "vue";
import { hasGlobalComponent } from "vuepress-shared/client";

import AutoCatalog, {
  type AutoCatalogProps,
} from "./components/AutoCatalog.js";

declare const AUTO_CATALOG_ICON_COMPONENT: string;

export default defineClientConfig({
  enhance: ({ app }) => {
    if (!hasGlobalComponent("AutoCatalog", app))
      app.component("AutoCatalog", (props: AutoCatalogProps) =>
        h(
          AutoCatalog,
          props,
          AUTO_CATALOG_ICON_COMPONENT
            ? {
                icon: ({ icon }: { icon: string }): VNode =>
                  h(resolveComponent(AUTO_CATALOG_ICON_COMPONENT), { icon }),
              }
            : {}
        )
      );
  },
});
