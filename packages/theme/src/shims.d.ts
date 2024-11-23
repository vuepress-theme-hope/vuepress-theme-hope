declare module "@temp/theme-hope/socialMedia.js" {
  export const icons: Record<string, string>;
}

declare module "@temp/theme-hope/sidebar.js" {
  interface SidebarGroupOptions {
    /**
     * Text of item
     *
     * 项目文字
     */
    text: string;

    /**
     * Icon of item
     *
     * 项目图标
     */
    icon?: string;

    /**
     * Aria label of item
     *
     * 项目无障碍标签
     */
    ariaLabel?: string;

    /**
     * Link prefix of current group
     *
     * 当前分组的页面前缀
     */
    prefix?: string;

    /**
     * Link of current group
     *
     * 当前分组的链接
     */
    link?: string;

    /**
     * Whether current group is expanded by default
     *
     * 当前分组的链接是否默认展开
     *
     * @default false
     */
    expanded?: boolean;

    /**
     * Whether current group is collapsible
     *
     * 当前分组的链接是否可折叠
     *
     * @default false
     */
    collapsible?: boolean;

    /**
     * Children of current group
     *
     * 当前分组的子项
     */
    children: SidebarItemOptions[];
  }

  export const sidebarData: Record<string, (SidebarGroupOptions | string)[]>;
}
