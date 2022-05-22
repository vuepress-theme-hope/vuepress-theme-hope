import type { BasePageFrontMatter } from "vuepress-shared";
import type { CopyrightOptions } from "./options";

export interface CopyrightPluginFrontmatter extends BasePageFrontMatter {
  copy?:
    | Pick<
        CopyrightOptions,
        "triggerWords" | "disableCopy" | "disableSelection"
      >
    | boolean;
}
