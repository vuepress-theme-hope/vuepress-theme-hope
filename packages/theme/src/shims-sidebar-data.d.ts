declare module "@temp/theme-hope/sidebar" {
  import type { ThemeSidebarGroupItem } from "vuepress-theme-hope/src/shared";

  export const sidebarData: Record<string, (ThemeSidebarGroupItem | string)[]>;
}
