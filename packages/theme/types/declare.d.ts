/* eslint-disable @typescript-eslint/no-explicit-any */
import { HopeThemeConfig } from "./hopeConfig";

declare module "@mr-hope/vuepress-types" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ThemeConfig extends HopeThemeConfig {
    /* nothing more extends */
  }
}

declare module "vue/types/vue" {
  export interface Vue {
    $category: any;
    $tag: any;
    $currentTag: any;
    $currentCategory: any;
    $pagination: any;
  }
}
