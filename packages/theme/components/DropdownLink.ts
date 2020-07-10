import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import DropdownTransition from "@theme/components/DropdownTransition.vue";
import { NavBarConfigItem } from "@theme/util/navbar";
import NavLink from "@theme/components/NavLink.vue";

// eslint-disable-next-line @typescript-eslint/naming-convention
@Component({ components: { NavLink, DropdownTransition } })
export default class DropdownLink extends Vue {
  @Prop({ type: Object, required: true })
  private readonly item!: NavBarConfigItem;

  private open = false;

  private get dropdownAriaLabel(): string {
    return this.item.ariaLabel || this.item.text;
  }

  private get iconPrefix(): string {
    const { iconPrefix } = this.$themeConfig;

    return iconPrefix === "" ? "" : iconPrefix || "icon-";
  }

  private setOpen(value: boolean): void {
    this.open = value;
  }

  handleDropdown(event: MouseEvent): void {
    const isTriggerByTab = event.detail === 0;
    if (isTriggerByTab) this.setOpen(!this.open);
  }

  private isLastItemOfArray(
    item: NavBarConfigItem,
    array: NavBarConfigItem[]
  ): boolean {
    if (Array.isArray(array)) return item === array[array.length - 1];

    return false;
  }

  @Watch("$route")
  onRouteChange(): void {
    this.open = false;
  }
}
