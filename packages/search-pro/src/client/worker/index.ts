import { database } from "@temp/search-pro/database";

import { type SearchIndex } from "../../shared/index.js";
import { getResults } from "../utils/index.js";

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __VUEPRESS_DEV__: boolean;
declare const __VUE_HMR_RUNTIME__: Record<string, unknown>;

let searchIndex = database;

// @ts-ignore
if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot))
  __VUE_HMR_RUNTIME__["updateSearchProDatabase"] = (
    database: SearchIndex
  ): void => {
    searchIndex = database;
  };

self.onmessage = ({
  data,
}: MessageEvent<{ query: string; routeLocale: string }>): void => {
  self.postMessage(getResults(data.query, searchIndex[data.routeLocale]));
};
