import type ArtalkConfig from "artalk/types/artalk-config.js";

import type { BaseCommentOptions } from "./base.js";

export type ArtalkOptions = BaseCommentOptions &
  Partial<Omit<ArtalkConfig.default, "el" | "pageKey">>;
