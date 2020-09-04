import { Component, Prop, Vue } from "vue-property-decorator";
import { ComponentOptions, CreateElement, VNode } from "vue";
import {
  SidebarHeader,
  SidebarHeaderItem,
  groupSidebarHeaders,
} from "@theme/util/sidebar";
import { Route } from "vue-router";
import { isActive } from "@theme/util/path";

interface RenderLinkOption {
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
  { text, link, active }: RenderLinkOption
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
        "anchor-link": true,
      },
    },
    [h("div", {}, [text])]
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
  { children, path, route, maxDepth, depth = 2 }: RenderChildrenOptions
): VNode | null => {
  if (!children || depth > maxDepth) return null;

  return h(
    "ul",
    { class: "anchor-list" },
    children.map((child: SidebarHeader) => {
      const active = isActive(route, `${path}#${child.slug}`);

      return h("li", { class: ["anchor", `anchor${depth}`] }, [
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
  header: SidebarHeaderItem[];
}

@Component({
  functional: true,
  render(
    h,
    { parent: { $page, $route, $themeConfig, $themeLocaleConfig }, props }
  ) {
    /** 当前渲染项目配置 */
    const { header } = props as SidebarLinkProps;
    /** 最大显示深度 */
    const maxDepth =
      (($page.frontmatter.sidebarDepth as number | undefined) ||
        ($themeLocaleConfig.sidebarDepth as number | undefined) ||
        $themeConfig.sidebarDepth ||
        2) + 1;
    const children = groupSidebarHeaders(header);

    return h("aside", { attrs: { id: "anchor" } }, [
      h("div", { class: "anchor-wrapper" }, [
        renderChildren(h, {
          children,
          path: $route.path,
          route: $route,
          maxDepth,
        }),
      ]),
    ]);
  },
} as FunctionalComponentOptions)
export default class Anchor extends Vue {
  @Prop({ type: Array, default: () => [] })
  private readonly header!: SidebarHeader[];
}
