import { MathJax } from "../markdown-it/mathjax.js";

import type { App } from "@vuepress/core";
import type { MathJaxUtils } from "../markdown-it/mathjax.js";

export const prepareMathjaxStyleFile = async (
  app: App,
  { adaptor, documentOptions }: MathJaxUtils
): Promise<void> => {
  await app.writeTemp(
    "md-enhance/mathjax.css",
    adaptor.innerHTML(
      documentOptions.OutputJax.styleSheet(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        MathJax.document("", documentOptions)
      )
    )
  );
};
