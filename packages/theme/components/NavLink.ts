import { Component, Prop, Vue } from "vue-property-decorator";
import { ensureExt, isExternal, isMailto, isTel } from "@theme/util/path";
import { NavBarConfigItem } from "@theme/util/navbar";

@Component
export default class NavLink extends Vue {
  @Prop({ type: Object, required: true })
  private readonly item!: NavBarConfigItem;

  private get link(): string {
    return ensureExt(this.item.link as string);
  }

  private get iconPrefix(): string {
    const { iconPrefix } = this.$themeConfig;

    return iconPrefix === "" ? "" : iconPrefix || "icon-";
  }

  private get active(): boolean {
    return this.link === this.$route.path;
  }

  private isExternal = isExternal;

  private isMailto = isMailto;

  private isTel = isTel;

  private focusoutAction(): void {
    this.$emit("focusout");
  }
}
