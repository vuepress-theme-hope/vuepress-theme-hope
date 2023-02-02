declare module "@temp/theme-hope/sidebar" {
  import { ThemeSidebarGroupItem } from "vuepress-theme-hope/src/shared";

  type;
  export const sidebarData: Record<string, (ThemeSidebarGroupItem | string)[]>;
}
