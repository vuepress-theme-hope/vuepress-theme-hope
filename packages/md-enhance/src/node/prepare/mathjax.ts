import { generateMathjaxStyle } from "@mdit/plugin-mathjax";

import type { App } from "@vuepress/core";
import type { MathjaxInstance } from "@mdit/plugin-mathjax";

// prevent mathjax breaking mobile layout
const style = `\
mjx-container {
  overflow-x: auto;
}
`;

export const prepareMathjaxStyleFile = async (
  app: App,
  mathjaxInstance: MathjaxInstance
): Promise<void> => {
  await app.writeTemp(
    "md-enhance/mathjax.css",
    `${generateMathjaxStyle(mathjaxInstance)}\n${style}`
  );
};
