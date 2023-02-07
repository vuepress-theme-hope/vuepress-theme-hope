import { defineClientConfig } from "@vuepress/client";
import { h } from "vue";
import { hasGlobalComponent } from "vuepress-shared/client";

import AutoCatalog, {
  type AutoCatalogProps,
} from "./components/AutoCatalog.js";

declare const AUTO_CATALOG_TITLE_META_KEY: string;
declare const AUTO_CATALOG_ICON_META_KEY: string;
declare const AUTO_CATALOG_ORDER_META_KEY: string;
declare const AUTO_CATALOG_INDEX_META_KEY: string;

export default defineClientConfig({
  enhance: ({ app }) => {
    if (!hasGlobalComponent("AutoCatalog", app))
      app.component("AutoCatalog", (props: AutoCatalogProps) =>
        h(AutoCatalog, {
          titleGetter: (meta): string =>
            meta[AUTO_CATALOG_TITLE_META_KEY] as string,
          iconGetter: (meta): string =>
            meta[AUTO_CATALOG_ICON_META_KEY] as string,
          orderGetter: (meta): number =>
            meta[AUTO_CATALOG_ORDER_META_KEY] as number,
          shouldIndex: (meta): boolean =>
            Boolean(meta[AUTO_CATALOG_INDEX_META_KEY]),
          ...props,
        })
      );
  },
});
