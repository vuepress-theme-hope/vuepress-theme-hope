import { store } from "@temp/search-pro/store.js";

import type { MatchedItem } from "../typings/index.js";

export const getPath = (item: MatchedItem): string =>
  store[item.id] + ("anchor" in item ? `#${item.anchor}` : "");
