import Vue, { PropType } from "vue";
import { CreateElement, VNode } from "vue";
import {
  SidebarExternalItem,
  SidebarErrorItem,
  SidebarPageItem,
  SidebarHeader,
  SidebarHeaderItem,
  groupSidebarHeaders,
} from "@theme/util/sidebar";
import { hashRE, isActive } from "@theme/util/path";
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

export default Vue.extend({
  name: "SidebarLink",

  functional: true,

  props: {
    item: {
      type: Object as PropType<
        | SidebarErrorItem
        | SidebarExternalItem
        | SidebarPageItem
        | SidebarHeaderItem
      >,
      required: true,
    },
  },

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  render(
    h,
    { parent: { $page, $route, $themeConfig, $themeLocaleConfig }, props }
  ) {
    const { item } = props;

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
      $page.frontmatter.sidebarDepth ||
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
});
