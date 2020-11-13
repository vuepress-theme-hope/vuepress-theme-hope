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
} from "@theme/util/sidebar";
import { hashRE, isActive } from "@theme/util/path";
import { HopeSideBarConfigItemObject } from "@mr-hope/vuepress-shared-utils";
import { Route } from "vue-router";

const renderIcon = (h: CreateElement, icon: string): VNode | null =>
  icon
    ? h("i", {
        class: ["iconfont", icon],
        style: "margin-right: 0.2em;",
      })
    : null;

interface RenderLinkOption {
  icon?: string;
  text: string;
  link: string;
  active: boolean;
}

const renderLink = (
  h: CreateElement,
  { icon = "", text, link, active }: RenderLinkOption
): VNode =>
  h(
    "RouterLink",
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

const renderExternalLink = (
  h: CreateElement,
  { path, title = path }: SidebarExternalItem
): VNode =>
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
  children: SidebarHeader[] | false;
  path: string;
  route: Route;
  depth?: number;
  maxDepth: number;
}

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
    const { item } = props as SidebarLinkProps;

    // if the item can not be resolved
    if (item.type === "error") return null;

    // external link
    if (item.type === "external") return renderExternalLink(h, item);

    /*
     * Use custom active class matching logic
     * Due to edge case of paths ending with / + hash
     */
    const selfActive = isActive($route, item.path);

    /** whether the item is active */
    const active =
      // if the item is a heading, then one of the children needs to be active
      item.type === "header"
        ? selfActive ||
          (item.children || []).some((child) =>
            isActive($route, `${item.basePath}#${child.slug}`)
          )
        : selfActive;

    const maxDepth =
      ($page.frontmatter.sidebarDepth as number | undefined) ||
      ($themeLocaleConfig.sidebarDepth as number) ||
      $themeConfig.sidebarDepth ||
      2;

    // the item is a heading
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

    const displayAllHeaders =
      ($themeLocaleConfig.displayAllHeaders as boolean | undefined) ||
      $themeConfig.displayAllHeaders;

    const link = renderLink(h, {
      icon:
        $themeConfig.sidebarIcon !== false && item.frontmatter.icon
          ? `${
              $themeConfig.iconPrefix === ""
                ? ""
                : $themeConfig.iconPrefix || "icon-"
            }${item.frontmatter.icon as string}`
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
