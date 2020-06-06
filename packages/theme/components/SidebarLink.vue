<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { ComponentOptions, CreateElement, VNode } from "vue";
import {
  SidebarAutoItem,
  SidebarExternalItem,
  SidebarGroupItem,
  SidebarHeader,
  SidebarHeaderItem,
  SidebarItem,
  groupSidebarHeaders,
} from "../util/sidebar";
import { hashRE, isActive } from "../util/path";
import { HopeSideBarConfigItemObject } from "@mr-hope/vuepress-shared-utils";
import { PageHeader } from "@mr-hope/vuepress-types";
import { Route } from "vue-router";

/** 渲染图标 */
const renderIcon = (h: CreateElement, icon: string) =>
  icon
    ? h("i", {
        class: ["iconfont", icon],
        style: "margin-right: 0.2em;",
      })
    : null;

interface RenderLinkOption {
  /** 图标 */
  icon?: string;
  /** 链接地址 */
  link: string;
  /** 链接文字 */
  text: string;
  /** 是否激活 */
  active: boolean;
}

/** 渲染链接 */
const renderLink = (
  h: CreateElement,
  { icon = "", text, link, active }: RenderLinkOption
) =>
  h(
    "router-link",
    {
      props: {
        to: link,
        activeClass: "",
        exactActiveClass: "",
      },
      class: {
        active,
        "sidebar-link": true,
      },
    },
    [renderIcon(h, icon), text]
  );

/** 渲染外部链接 */
const renderExternal = (
  h: CreateElement,
  { path, title = path }: SidebarExternalItem
) =>
  h(
    "a",
    {
      attrs: {
        href: path,
        target: "_blank",
        rel: "noopener noreferrer",
      },
      class: { "sidebar-link": true },
    },
    [title, h("OutboundLink")]
  );

interface RenderChildrenOptions {
  /** 子项 */
  children: SidebarHeader[] | false;
  /** 配置项路径 */
  path: string;
  /** 当前路由对象 */
  route: Route;
  /** 当前深度 */
  depth?: number;
  /** 所允许的最大深度 */
  maxDepth: number;
}

/** 渲染子项 */
const renderChildren = (
  h: CreateElement,
  { children, path, route, maxDepth, depth = 1 }: RenderChildrenOptions
): VNode | null => {
  if (!children || depth > maxDepth) return null;

  return h(
    "ul",
    { class: "sidebar-sub-headers" },
    children.map((child: SidebarHeader) => {
      const active = isActive(route, `${path}#${child.slug}`);

      return h("li", { class: "sidebar-sub-header" }, [
        renderLink(h, {
          text: child.title,
          link: `${path}#${child.slug}`,
          active,
        }),
        renderChildren(h, {
          children: child.children || false,
          path,
          route,
          maxDepth,
          depth: depth + 1,
        }),
      ]);
    })
  );
};

// Functional Component Hack
interface FunctionalComponentOptions extends ComponentOptions<Vue> {
  functional?: boolean;
}

interface SidebarLinkProps {
  item:
    | Exclude<SidebarItem, SidebarAutoItem | SidebarGroupItem>
    | SidebarHeaderItem;
}

@Component({
  functional: true,
  render(
    h,
    { parent: { $page, $route, $themeConfig, $themeLocaleConfig }, props }
  ) {
    /** 当前渲染项目配置 */
    const { item } = props as SidebarLinkProps;

    // 当前配置未获取成功
    if (item.type === "error") return null;

    // 外部链接侧边栏项
    if (item.type === "external") return renderExternal(h, item);

    /*
     * Use custom active class matching logic
     * Due to edge case of paths ending with / + hash
     */
    const selfActive = isActive($route, item.path);

    /** 当前渲染项目的激活状态 */
    const active =
      // 如果是标题侧边栏的话，其中一个子标题匹配也需要激活
      item.type === "header"
        ? selfActive ||
          (item.children || []).some((child) =>
            isActive($route, `${item.basePath}#${child.slug}`)
          )
        : selfActive;

    /** 最大显示深度 */
    const maxDepth =
      $page.frontmatter.sidebarDepth ||
      $themeLocaleConfig.sidebarDepth ||
      $themeConfig.sidebarDepth ||
      2;

    // 如果是标题侧边栏
    if (item.type === "header")
      return [
        renderLink(h, {
          text: item.title || item.path,
          link: item.path,
          active,
        }),
        renderChildren(h, {
          children: item.children || false,
          path: item.basePath,
          route: $route,
          maxDepth,
        }),
      ];

    /** 是否显示所有标题 */
    const displayAllHeaders =
      $themeLocaleConfig.displayAllHeaders || $themeConfig.displayAllHeaders;

    const link = renderLink(h, {
      icon:
        $themeConfig.sidebarIcon !== false && item.frontmatter.icon
          ? `${
              $themeConfig.iconPrefix === ""
                ? ""
                : $themeConfig.iconPrefix || "icon-"
            }${item.frontmatter.icon}`
          : "",
      text: item.title || item.path,
      link: item.path,
      active,
    });

    if (
      (active || displayAllHeaders) &&
      item.headers &&
      !hashRE.test(item.path)
    ) {
      const children = groupSidebarHeaders(item.headers);

      return [
        link,
        renderChildren(h, {
          children,
          path: item.path,
          route: $route,
          maxDepth,
        }),
      ];
    }

    return link;
  },
} as FunctionalComponentOptions)
export default class SidebarLink extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  private readonly item!: HopeSideBarConfigItemObject;
}
</script>

<style lang="stylus">
.sidebar
  .sidebar-links
    ul.sidebar-sub-headers
      padding-left 1rem
      font-size 0.95em

      .has-anchor &
        @media (min-width: $MQWide)
          display none

a.sidebar-link
  font-size 1em
  font-weight 400
  display inline-block
  color var(--text-color)
  border-left 0.25rem solid transparent
  padding 0.35rem 1rem 0.35rem 1.25rem
  line-height 1.4
  width 100%
  box-sizing border-box

  &:hover
    color var(--accent-color)

  &.active
    font-weight 600
    color var(--accent-color)
    border-left-color var(--accent-color)

  .sidebar-group &
    padding-left 2rem

  .sidebar-sub-headers &
    padding-top 0.25rem
    padding-bottom 0.25rem
    border-left none

    &.active
      font-weight 500
</style>
