import type { BasePageFrontMatter } from "vuepress-shared";
import type { CopyrightOptions } from "./options.js";

export interface CopyrightPluginFrontmatter extends BasePageFrontMatter {
  copy?:
    | Pick<
        CopyrightOptions,
        "triggerWords" | "disableCopy" | "disableSelection"
      >
    | boolean;
}
