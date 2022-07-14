import { droppedLogger } from "./utils";

import type { FeedOptions } from "../../shared";

/** @deprecated */
export const convertOptions = (
  options: FeedOptions & Record<string, unknown>
): void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line
  options.atom = options["output"]?.atom?.enable ?? true;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line
  options.json = options["output"]?.json?.enable ?? true;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line
  options.rss = options["output"]?.rss?.enable ?? true;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line
  options.atomOutputFilename = options["output"]?.atom?.path ?? "atom.xml";
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line
  options.jsonOutputFilename = options["output"]?.json?.path ?? "feed.json";
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line
  options.jsonOutputFilename = options["output"]?.rss?.path ?? "rss.xml";

  droppedLogger(options, "output");
};
