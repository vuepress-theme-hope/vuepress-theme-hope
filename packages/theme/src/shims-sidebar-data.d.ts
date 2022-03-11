declare module "@temp/theme-hope/sidebar" {
  import type { HopeThemeSidebarGroupItem } from "vuepress-theme-hope/src/shared";

  export const sidebarData: Record<
    string,
    (HopeThemeSidebarGroupItem | string)[]
  >;
}
