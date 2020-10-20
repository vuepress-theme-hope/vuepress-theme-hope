import { Component, Prop, Vue } from "vue-property-decorator";
import { SidebarAutoItem, SidebarGroupItem } from "@theme/util/sidebar";
import DropdownTransition from "@theme/components/DropdownTransition.vue";
import { isActive } from "@theme/util/path";

@Component({ components: { DropdownTransition } })
export default class SidebarGroup extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  private readonly item!: SidebarAutoItem | SidebarGroupItem;

  @Prop(Boolean)
  private readonly open!: boolean;

  @Prop(Number)
  private readonly depth!: number;

  private isActive = isActive;

  private getIcon(icon: string | undefined): string {
    const { iconPrefix } = this.$themeConfig;

    return this.$themeConfig.sidebarIcon !== false && icon
      ? `${iconPrefix === "" ? "" : iconPrefix || "icon-"}${icon}`
      : "";
  }

  private beforeCreate(): void {
    // eslint-disable-next-line
    this.$options.components!.SidebarLinks = require("@theme/components/SidebarLinks.vue").default;
  }
}
