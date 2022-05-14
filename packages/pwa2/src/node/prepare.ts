import { ensureEndingSlash } from "@vuepress/shared";
import { path } from "@vuepress/utils";

import type { App } from "@vuepress/core";
import type { PWAOptions } from "../shared";

const CLIENT_FOLDER = ensureEndingSlash(path.resolve(__dirname, "../client"));

export const prepareConfigFile = (
  app: App,
  options: PWAOptions
): Promise<string> => {
  let configImport = "";
  let rootComponents = "";

  if (options.showInstall) {
    configImport += `import PWAInstall from "${CLIENT_FOLDER}components/PWAInstall";\n`;

    rootComponents += `PWAInstall,\n`;
  }

  if (options.update === "hint") {
    configImport += `import SWHintPopup from "${
      options.hintComponent || `${CLIENT_FOLDER}components/SWHintPopup`
    }";\n`;

    rootComponents += `SWHintPopup,\n`;
  } else if (options.update !== "disable" && options.update !== "force") {
    configImport += `import SWUpdatePopup from "${
      options.updateComponent || `${CLIENT_FOLDER}components/SWUpdatePopup`
    }";\n`;

    rootComponents += `SWUpdatePopup,\n`;
  }

  return app.writeTemp(
    `pwa2/config.js`,
    `import { defineClientConfig } from "@vuepress/client";
import { setupPWA } from "${CLIENT_FOLDER}composables/setup";
${configImport}

export default defineClientConfig({
  setup: () => {
    setupPWA();
  },
  rootComponents: [
${rootComponents
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  ],
});`
  );
};
