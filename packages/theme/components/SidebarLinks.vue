<template>
  <ul v-if="items.length" class="sidebar-links">
    <li v-for="(item, index) in items" :key="index">
      <SidebarGroup
        v-if="item.type === 'group'"
        :item="item"
        :open="index === openGroupIndex"
        :depth="depth"
        @toggle="toggleGroup(index)"
      />
      <SidebarLink v-else :item="item" />
    </li>
  </ul>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { SidebarHeader, SidebarItem } from "../util/sidebar";
import { HopeSideBarConfigItem } from "@mr-hope/vuepress-shared-utils";
import { PageComputed } from "@mr-hope/vuepress-types";
import { Route } from "vue-router";
import SidebarGroup from "@theme/components/SidebarGroup.vue";
import SidebarLink from "@theme/components/SidebarLink.vue";
import { isActive } from "../util/path";

/** 当前项目是否激活 */
const descendantIsActive = (route: Route, item: SidebarItem): boolean => {
  if (item.type === "group")
    return item.children.some((child: any) => {
      if (child.type === "group") return descendantIsActive(route, child);

      return child.type === "page" && isActive(route, child.path);
    });

  return false;
};

/** 打开的侧边栏组的索引值 */
const resolveOpenGroupIndex = (route: Route, items: SidebarItem[]) => {
  for (let i = 0; i < items.length; i++)
    if (descendantIsActive(route, items[i])) return i;

  return -1;
};

@Component({ components: { SidebarGroup, SidebarLink } })
export default class SidebarLinks extends Vue {
  @Prop(Array)
  private readonly items!: SidebarItem[];

  @Prop(Number)
  private readonly depth!: number;

  private openGroupIndex = 0;

  private refreshIndex() {
    const index = resolveOpenGroupIndex(this.$route, this.items);

    if (index > -1) this.openGroupIndex = index;
  }

  private toggleGroup(index: number) {
    this.openGroupIndex = index === this.openGroupIndex ? -1 : index;
  }

  private isActive(page: PageComputed) {
    return isActive(this.$route, page.regularPath);
  }

  private created() {
    this.refreshIndex();
  }

  @Watch("$route")
  onRouteUpdate() {
    this.refreshIndex();
  }
}
</script>
