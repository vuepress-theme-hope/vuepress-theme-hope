import type { App } from "@vuepress/core";
import {
  getRealPath,
  isArray,
  isNumber,
  isPlainObject,
} from "vuepress-shared/node";

import { getIconLinks, getNoticeOptions } from "./components/index.js";
import type { BackToTopOptions, ComponentOptions } from "./options/index.js";
import {
  AVAILABLE_COMPONENTS,
  CLIENT_FOLDER,
  COMPONENT_PKG,
  isInstalled,
} from "./utils.js";

const { url } = import.meta;

export const prepareConfigFile = (
  app: App,
  {
    components = [],
    componentOptions = {},
    rootComponents = {},
  }: ComponentOptions,
  legacy: boolean,
): Promise<string> => {
  const imports: string[] = [];
  let enhance = "";
  const setups: string[] = [];
  const configRootComponents: string[] = [];
  let shouldImportH = false;
  let shouldImportUseScriptTag = false;
  let shouldImportUseStyleTag = false;

  components.forEach((item) => {
    if (
      AVAILABLE_COMPONENTS.includes(item) &&
      (!COMPONENT_PKG[item] ||
        COMPONENT_PKG[item].every((pkg) => isInstalled(pkg, true)))
    ) {
      imports.push(
        `import ${item} from "${CLIENT_FOLDER}components/${item}.js";`,
      );

      enhance += `\
if(!hasGlobalComponent("${item}")) app.component("${item}", ${item});
`;
    }

    if (item === "FontIcon")
      getIconLinks(componentOptions.fontIcon?.assets).forEach((item) => {
        const { type, content } = item;

        if (type === "script") shouldImportUseScriptTag = true;
        else shouldImportUseStyleTag = true;

        setups.push(content);
      });

    if (legacy && (item as unknown) === "Catalog") {
      imports.push(
        `import Catalog from "${CLIENT_FOLDER}compact/components/Catalog.js";`,
      );
      enhance += `\
if(!hasGlobalComponent("Catalog")) app.component("Catalog", Catalog);
`;
    }
  });

  if (rootComponents.backToTop) {
    const { threshold, progress } = isPlainObject(rootComponents.backToTop)
      ? rootComponents.backToTop
      : <BackToTopOptions>{};

    shouldImportH = true;
    imports.push(
      `import BackToTop from "${CLIENT_FOLDER}components/BackToTop.js";`,
    );

    const config = isPlainObject(rootComponents.backToTop)
      ? {
          ...(isNumber(threshold) ? { threshold } : {}),
          ...(progress === false ? { noProgress: true } : {}),
        }
      : {};

    configRootComponents.push(`() => h(BackToTop, ${JSON.stringify(config)}),`);
  }

  if (isArray(rootComponents.notice)) {
    shouldImportH = true;
    imports.push(`import Notice from "${CLIENT_FOLDER}components/Notice.js";`);

    configRootComponents.push(
      `() => h(Notice, { config: ${JSON.stringify(
        getNoticeOptions(rootComponents.notice),
      )} }),`,
    );
  }

  return app.writeTemp(
    `components/config.js`,
    `\
import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "${getRealPath(
      "vuepress-shared/client",
      url,
    )}";
${
  shouldImportH
    ? `\
import { h } from "vue";
`
    : ""
}
${
  shouldImportUseScriptTag
    ? `\
import { useScriptTag } from "${getRealPath("@vueuse/core/index.mjs", url)}";
`
    : ""
}\
${
  shouldImportUseStyleTag
    ? `\
import { useStyleTag } from "${getRealPath("@vueuse/core/index.mjs", url)}";
`
    : ""
}\
${imports.join("\n")}

import "${CLIENT_FOLDER}styles/sr-only.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
${enhance
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  },
  setup: () => {
${setups.map((item) => `    ${item}`).join("\n")}
  },
  rootComponents: [
${configRootComponents.map((item) => `    ${item}`).join("\n")}
  ],
});
`,
  );
};
