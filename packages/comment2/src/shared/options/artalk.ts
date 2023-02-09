import ArtalkConfig from "artalk/types/artalk-config.js";

import { type BaseCommentOptions } from "./base.js";

export interface ArtalkOptions
  extends BaseCommentOptions,
    Partial<
      Omit<
        ArtalkConfig.default,
        "el" | "imgUploader" | "avatarURLBuilder" | "pageKey"
      >
    > {
  provider: "Artalk";
}
