import type { ArtalkConfig } from "artalk";

import type { BaseCommentOptions } from "./base.js";

export type ArtalkOptions = BaseCommentOptions &
  Partial<Omit<ArtalkConfig, "el" | "pageKey">>;
