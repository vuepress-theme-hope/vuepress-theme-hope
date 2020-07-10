import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { SidebarHeaderItem, SidebarItem } from "@theme/util/sidebar";
import { PageComputed } from "@mr-hope/vuepress-types";
import { Route } from "vue-router";
import SidebarGroup from "@theme/components/SidebarGroup.vue";
import SidebarLink from "@theme/components/SidebarLink.vue";
import { isActive } from "@theme/util/path";

/** 当前项目是否激活 */
const descendantIsActive = (route: Route, item: SidebarItem): boolean => {
  if (item.type === "group")
    return item.children.some((child: SidebarHeaderItem | SidebarItem) => {
      if (child.type === "group") return descendantIsActive(route, child);

      return child.type === "page" && isActive(route, child.path);
    });

  return false;
};

/** 打开的侧边栏组的索引值 */
const resolveOpenGroupIndex = (route: Route, items: SidebarItem[]): number => {
  for (let i = 0; i < items.length; i++)
    if (descendantIsActive(route, items[i])) return i;

  return -1;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
@Component({ components: { SidebarGroup, SidebarLink } })
export default class SidebarLinks extends Vue {
  @Prop(Array)
  private readonly items!: SidebarItem[];

  @Prop(Number)
  private readonly depth!: number;

  private openGroupIndex = 0;

  private refreshIndex(): void {
    const index = resolveOpenGroupIndex(this.$route, this.items);

    if (index > -1) this.openGroupIndex = index;
  }

  private toggleGroup(index: number): void {
    this.openGroupIndex = index === this.openGroupIndex ? -1 : index;
  }

  private isActive(page: PageComputed): boolean {
    return isActive(this.$route, page.regularPath);
  }

  private created(): void {
    this.refreshIndex();
  }

  @Watch("$route")
  onRouteUpdate(): void {
    this.refreshIndex();
  }
}
