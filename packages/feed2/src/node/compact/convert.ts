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
    }
): void => {
  options.atom = options["output"]?.atom?.enable ?? true;
  options.json = options["output"]?.json?.enable ?? true;
  options.rss = options["output"]?.rss?.enable ?? true;
  options.atomOutputFilename = options["output"]?.atom?.path ?? "atom.xml";
  options.jsonOutputFilename = options["output"]?.json?.path ?? "feed.json";
  options.jsonOutputFilename = options["output"]?.rss?.path ?? "rss.xml";

  deprecatedLogger({
    options,
    deprecatedOption: "customElements",
    newOption: "removedElements",
  });

  droppedLogger(options, "output");
};
