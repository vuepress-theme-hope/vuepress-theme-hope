import { generateMathjaxStyle } from "@mdit/plugin-mathjax";

import type { App } from "@vuepress/core";
import type { MathjaxInstance } from "@mdit/plugin-mathjax";

export const prepareMathjaxStyleFile = async (
  app: App,
  mathjaxInstance: MathjaxInstance
): Promise<void> => {
  await app.writeTemp(
    "md-enhance/mathjax.css",
    generateMathjaxStyle(mathjaxInstance)
  );
};
