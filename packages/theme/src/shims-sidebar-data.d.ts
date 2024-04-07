declare module "@temp/theme-hope/sidebar.js" {
  import type { SidebarGroupItem } from "vuepress-theme-hope";

  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  export const sidebarData: Record<string, (SidebarGroupItem | string)[]>;
}
