import { Component, Prop, Vue } from "vue-property-decorator";
import { PageComputed, SiteData, ThemeConfig } from "@mr-hope/vuepress-types";
import {
  SidebarErrorItem,
  SidebarExternalItem,
  SidebarGroupItem,
  SidebarItem,
  SidebarPageItem,
  resolvePageforSidebar,
} from "@theme/util/sidebar";
import NextIcon from "@mr-hope/vuepress-shared-utils/icons/NextIcon.vue";
import PrevIcon from "@mr-hope/vuepress-shared-utils/icons/PrevIcon.vue";
import { Route } from "vue-router";
import { resolvePath } from "@theme/util/path";

const getSidebarItems = (
  items: SidebarItem[],
  result: (SidebarPageItem | SidebarExternalItem | SidebarErrorItem)[]
): void => {
  for (const item of items)
    if (item.type === "group")
      getSidebarItems((item as SidebarGroupItem).children || [], result);
    else result.push(item);
};

const find = (
  page: PageComputed,
  items: SidebarItem[],
  offset: -1 | 1
): SidebarItem | false => {
  const result: (
    | SidebarPageItem
    | SidebarExternalItem
    | SidebarErrorItem
  )[] = [];

  getSidebarItems(items, result);

  for (let i = 0; i < result.length; i++) {
    const cur = result[i];

    if (cur.type === "page" && cur.path === decodeURIComponent(page.path))
      return result[i + offset];
  }

  return false;
};

interface LinkOptions {
  themeConfig: ThemeConfig;
  page: PageComputed;
  route: Route;
  site: SiteData;
  sidebarItems: SidebarItem[];
}

const resolvePageLink = (
  linkType: "prev" | "next",
  { themeConfig, page, route, site, sidebarItems }: LinkOptions
): SidebarItem | false => {
  const themeLinkConfig =
    themeConfig[`${linkType}Links` as "prevLinks" | "nextLinks"];
  const pageLinkConfig = page.frontmatter[linkType] as
    | string
    | false
    | undefined;

  if (themeLinkConfig === false || pageLinkConfig === false) return false;

  if (typeof pageLinkConfig === "string")
    return resolvePageforSidebar(
      site.pages,
      resolvePath(pageLinkConfig, route.path)
    );

  return find(page, sidebarItems, linkType === "prev" ? -1 : 1);
};

@Component({ components: { NextIcon, PrevIcon } })
export default class PageNav extends Vue {
  @Prop(Array)
  private readonly sidebarItems!: SidebarItem[];

  private get prev(): SidebarItem | false {
    return resolvePageLink("prev", {
      sidebarItems: this.sidebarItems,
      themeConfig: this.$themeConfig,
      page: this.$page,
      route: this.$route,
      site: this.$site,
    });
  }

  private get next(): SidebarItem | false {
    return resolvePageLink("next", {
      sidebarItems: this.sidebarItems,
      themeConfig: this.$themeConfig,
      page: this.$page,
      route: this.$route,
      site: this.$site,
    });
  }
}
