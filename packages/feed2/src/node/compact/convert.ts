import { isPlainObject } from "vuepress-shared/node";

import { deprecatedLogger, droppedLogger } from "./utils.js";
import type { FeedOptions } from "../typings/index.js";

/** @deprecated */
export const convertOptions = (
  options: FeedOptions &
    Record<string, unknown> & {
      output?: {
        atom?: { enable?: boolean; path?: string };
        json?: { enable?: boolean; path?: string };
        rss?: { enable?: boolean; path?: string };
      };
    },
): void => {
  const output = options["output"];

  if (isPlainObject(output)) {
    options.atom = output.atom?.enable ?? false;
    options.json = output.json?.enable ?? false;
    options.rss = output.rss?.enable ?? false;
    options.atomOutputFilename = output.atom?.path ?? "atom.xml";
    options.jsonOutputFilename = output.json?.path ?? "feed.json";
    options.rssOutputFilename = output.rss?.path ?? "rss.xml";
  }

  deprecatedLogger({
    options,
    deprecatedOption: "customElements",
    newOption: "preservedElements",
  });

  deprecatedLogger({
    options,
    deprecatedOption: "removedElements",
    newOption: "preservedElements",
  });

  droppedLogger(options, "output");
};
