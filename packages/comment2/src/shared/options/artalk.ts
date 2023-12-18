import type { ArtalkConfig } from "artalk/dist/types/config.js";

import type { BaseCommentOptions } from "./base.js";

export type ArtalkOptions = BaseCommentOptions &
  Partial<Omit<ArtalkConfig, "el" | "pageKey">>;
