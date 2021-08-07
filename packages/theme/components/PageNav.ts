import Vue from "vue";
import NextIcon from "@theme/icons/NextIcon.vue";
import PrevIcon from "@theme/icons/PrevIcon.vue";
import { resolvePath } from "@theme/utils/path";
import { resolvePageforSidebar } from "@theme/utils/sidebar";

import type {
  PageComputed,
  SiteData,
  ThemeConfig,
} from "@mr-hope/vuepress-types";
import type { PropType } from "vue";
import type { Route } from "vue-router";
import type {
  SidebarErrorItem,
  SidebarExternalItem,
  SidebarItem,
  SidebarPageItem,
} from "@theme/utils/sidebar";

const getSidebarItems = (
  items: SidebarItem[],
  result: (SidebarPageItem | SidebarExternalItem | SidebarErrorItem)[]
): void => {
  for (const item of items)
    if (item.type === "group")
      getSidebarItems((item.children || []) as SidebarItem[], result);
    else result.push(item);
};

const find = (
  page: PageComputed,
  items: SidebarItem[],
  offset: -1 | 1
): SidebarItem | false => {
  const result: (SidebarPageItem | SidebarExternalItem | SidebarErrorItem)[] =
    [];

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
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    themeConfig[`${linkType}Links` as "prevLinks" | "nextLinks"];
  const pageLinkConfig = page.frontmatter[linkType];

  if (themeLinkConfig === false || pageLinkConfig === false) return false;

  if (typeof pageLinkConfig === "string")
    return resolvePageforSidebar(
      site.pages,
      resolvePath(pageLinkConfig, route.path)
    );

  return find(page, sidebarItems, linkType === "prev" ? -1 : 1);
};

export default Vue.extend({
  name: "PageNav",

  components: { NextIcon, PrevIcon },

  props: {
    sidebarItems: {
      type: Array as PropType<SidebarItem[]>,
      default: (): SidebarItem[] => [],
    },
  },

  computed: {
    prev(): SidebarItem | false {
      return resolvePageLink("prev", {
        sidebarItems: this.sidebarItems,
        themeConfig: this.$themeConfig,
        page: this.$page,
        route: this.$route,
        site: this.$site,
      });
    },

    next(): SidebarItem | false {
      return resolvePageLink("next", {
        sidebarItems: this.sidebarItems,
        themeConfig: this.$themeConfig,
        page: this.$page,
        route: this.$route,
        site: this.$site,
      });
    },
  },
});
