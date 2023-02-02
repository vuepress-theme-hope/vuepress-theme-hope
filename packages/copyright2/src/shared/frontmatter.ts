import { type BasePageFrontMatter } from "vuepress-shared";

export interface CopyrightPluginFrontmatter extends BasePageFrontMatter {
  copy?:
    | {
        /**
         * Min words triggering copyright append
         *
         * 触发附加版权的最小字数
         *
         * @default 100
         */
        triggerWords?: number;

        /**
         * Disable copy
         *
         * 禁用复制
         *
         * @default false
         */
        disableCopy?: boolean;

        /**
         * Disable selection
         *
         * 禁用选择
         *
         * @default false
         */
        disableSelection?: boolean;
      }
    | boolean;
}
