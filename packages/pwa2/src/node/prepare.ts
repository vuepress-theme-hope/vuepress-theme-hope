import { type App } from "@vuepress/core";

import { type PWAOptions } from "./options.js";
import { CLIENT_FOLDER } from "./utils.js";

export const prepareConfigFile = (
  app: App,
  options: PWAOptions
): Promise<string> => {
  let configImport = "";
  let rootComponents = "";

  if (options.update === "hint") {
    configImport += `\
import SWHintPopup from "${
      options.hintComponent || `${CLIENT_FOLDER}components/SWHintPopup.js`
    }";
`;

    rootComponents += `\
SWHintPopup,
`;
  } else if (options.update !== "disable" && options.update !== "force") {
    configImport += `\
import SWUpdatePopup from "${
      options.updateComponent || `${CLIENT_FOLDER}components/SWUpdatePopup.js`
    }";
`;

    rootComponents += `\
SWUpdatePopup,
`;
  }

  return app.writeTemp(
    `pwa2/config.js`,
    `\
import { defineClientConfig } from "@vuepress/client";
import { setupPWA } from "${CLIENT_FOLDER}composables/setup.js";
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
});
`
  );
};
