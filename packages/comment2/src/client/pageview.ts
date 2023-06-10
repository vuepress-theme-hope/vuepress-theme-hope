import { pageviewCount } from "@waline/client/dist/pageview.mjs";

import type { WalineOptions } from "../shared/index.js";

declare const COMMENT_OPTIONS: WalineOptions;

export const updatePageview = (): (() => void) =>
  pageviewCount({
    serverURL: COMMENT_OPTIONS.serverURL,
  });
