import type { WalineAbort } from "@waline/client";

import type { WalineOptions } from "../shared/index.js";

declare const COMMENT_OPTIONS: WalineOptions;

export const updatePageview = async (): Promise<WalineAbort | void> => {
  try {
    const { pageviewCount } = await import(
      /* webpackChunkName: "pageview" */ "@waline/client/pageview"
    );

    return pageviewCount({ serverURL: COMMENT_OPTIONS.serverURL });
  } catch (err) {
    console.error("@waline/client is not installed!");

    return;
  }
};
