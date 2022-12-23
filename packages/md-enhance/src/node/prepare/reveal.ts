import { ensureEndingSlash } from "@vuepress/shared";
import { getDirname, path } from "@vuepress/utils";

import type { App } from "@vuepress/core";
import type { RevealPlugin } from "../typings/index.js";

const __dirname = getDirname(import.meta.url);
const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../../client")
);

export const prepareRevealPluginFile = async (
  app: App,
  revealPlugins: RevealPlugin[]
): Promise<void> => {
  const packages = [
    "reveal",
    "revealMarkdown",
    ...revealPlugins.map(
      (key) => `reveal${key[0].toUpperCase()}${key.substring(1)}`
    ),
  ];

  await app.writeTemp(
    "md-enhance/reveal.js",
    `\
import { ${packages.join(", ")} } from "${CLIENT_FOLDER}reveal/index.js";

export const useReveal = () => [${packages
      .map((name) => `${name}()`)
      .join(", ")}];
`
  );
};
