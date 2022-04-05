import type { BasePageFrontMatter } from "@mr-hope/vuepress-shared";
import type { CopyrightOptions } from "./options";

export interface CopyrightPluginFrontmatter extends BasePageFrontMatter {
  copy?:
    | Pick<
        CopyrightOptions,
        "triggerWords" | "disableCopy" | "disableSelection"
      >
    | boolean;
}
