import type { App } from "@vuepress/core";

import type { RevealPlugin } from "../typings/index.js";
import { CLIENT_FOLDER } from "../utils.js";

export const prepareRevealPluginFile = async (
  app: App,
  revealPlugins: RevealPlugin[],
): Promise<void> => {
  const packages = [
    "reveal",
    "revealMarkdown",
    ...revealPlugins.map(
      (key) => `reveal${key[0].toUpperCase()}${key.substring(1)}`,
    ),
  ];

  await app.writeTemp(
    "md-enhance/reveal.js",
    `\
import { ${packages.join(", ")} } from "${CLIENT_FOLDER}index.js";

export const useReveal = () => [${packages
      .map((name) => `${name}()`)
      .join(", ")}];
`,
  );
};
