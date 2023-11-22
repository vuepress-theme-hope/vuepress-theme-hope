import { idMap } from "@temp/search-pro/idMap";

import type { MatchedItem } from "../typings/index.js";

export const getPath = (item: MatchedItem): string =>
  idMap[item.key] + ("anchor" in item ? `#${item.anchor}` : "");
