import { deprecatedLogger, droppedLogger } from "./utils.js";

import type { FeedOptions } from "../typings/index.js";

/** @deprecated */
export const convertOptions = (
  options: FeedOptions & Record<string, unknown>
): void => {
  // @ts-ignore
  // eslint-disable-next-line
  options.atom = options["output"]?.atom?.enable ?? true;

  // @ts-ignore
  // eslint-disable-next-line
  options.json = options["output"]?.json?.enable ?? true;

  // @ts-ignore
  // eslint-disable-next-line
  options.rss = options["output"]?.rss?.enable ?? true;

  // @ts-ignore
  // eslint-disable-next-line
  options.atomOutputFilename = options["output"]?.atom?.path ?? "atom.xml";

  // @ts-ignore
  // eslint-disable-next-line
  options.jsonOutputFilename = options["output"]?.json?.path ?? "feed.json";

  // @ts-ignore
  // eslint-disable-next-line
  options.jsonOutputFilename = options["output"]?.rss?.path ?? "rss.xml";

  deprecatedLogger({
    options,
    deprecatedOption: "customElements",
    newOption: "removedElements",
  });

  droppedLogger(options, "output");
};
