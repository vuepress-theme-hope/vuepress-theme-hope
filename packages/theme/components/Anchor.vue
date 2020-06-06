<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { ComponentOptions, CreateElement, VNode } from "vue";
import {
  SidebarGroupItem,
  SidebarHeader,
  SidebarHeaderItem,
  groupSidebarHeaders,
} from "../util/sidebar";
import { hashRE, isActive } from "../util/path";
import { HopeSideBarConfigItemObject } from "@mr-hope/vuepress-shared-utils";
import { PageHeader } from "@mr-hope/vuepress-types";
import { Route } from "vue-router";

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
      ($page.frontmatter.sidebarDepth ||
        $themeLocaleConfig.sidebarDepth ||
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
</script>

<style lang="stylus">
$headings = 2 3 4 5 6

#anchor
  display none
  position fixed
  top ($navbarHeight + 2rem)
  right 0.5rem
  min-width 10rem
  max-width 15rem
  max-height 80vh
  overflow-y scroll

  @media (min-width: $MQWide)
    .has-anchor &
      display block

  &::-webkit-scrollbar-track-piece
    background-color transparent

  .anchor-wrapper
    position relative
    padding-left 8px

    &::after
      content ' '
      position absolute
      top 16px
      left 4px
      bottom 14px
      z-index -1
      margin-left -2px
      width 4px
      background var(--border-color)

    > .anchor-list
      margin 0

    .anchor-list
      padding-left 0

      .anchor
        box-sizing border-box
        list-style none
        padding 0px 8px

        .anchor-link
          display inline-block
          position relative
          max-width 100%
          color var(--light-grey)

          > div
            line-height 1
            text-overflow ellipsis
            white-space nowrap
            overflow hidden

          &::before
            content ' '
            position absolute
            z-index 2
            top 50%
            margin-left -3px
            margin-top -3px
            width 6px
            height 6px
            background var(--background-color)
            border 1px solid var(--border-color)
            border-radius 50%

          &:hover, &.active
            color var(--accent-color)

            &::before
              background var(--accent-color)

        for $heading in $headings
          &.anchor{$heading} .anchor-link
            font-size (16 - $heading)px

            &::before
              left (-8 * $heading + 4)px
</style>
