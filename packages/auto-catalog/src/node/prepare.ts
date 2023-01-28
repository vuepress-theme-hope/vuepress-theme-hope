import { createRequire } from "node:module";

import type { App } from "@vuepress/core";

const require = createRequire(import.meta.url);

export const prepareConfigFile = (
  app: App,
  {
    iconRouteMetaKey,
    indexRouteMetaKey,
    orderRouteMetaKey,
    titleRouteMetaKey,
  }: Record<string, string>
): Promise<string> => {
  const content = `\
import { defineClientConfig } from "@vuepress/client";
import { defineAsyncComponent, h } from "vue";
import { hasGlobalComponent } from "${require.resolve(
    "vuepress-shared/client"
  )}";

export default defineClientConfig({
  enhance: ({ app }) => {
    if (!hasGlobalComponent("AutoCatalog", app))
      app.component("AutoCatalog", () =>
        h(
          defineAsyncComponent(
            () =>
              import("${require.resolve(
                "vuepress-plugin-components/client/components/Catalog.js"
              )}")
          ),
          {
            titleGetter: (meta) => meta["${titleRouteMetaKey}"],
            iconGetter: (meta) => meta["${iconRouteMetaKey}"],
            orderGetter: (meta) => meta["${orderRouteMetaKey}"],
            shouldIndex: (meta) => Boolean(meta["${indexRouteMetaKey}"]),
          }
        )
      );
  },
});
`;

  return app.writeTemp("auto-catalog/config.js", content);
};
