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

  private get exact(): boolean {
    if (this.$site.locales)
      return Object.keys(this.$site.locales).some(
        (rootLink) => rootLink === this.link
      );

    return this.link === "/";
  }

  private get isNonHttpURI(): boolean {
    return isMailto(this.link) || isTel(this.link);
  }

  private get isBlankTarget(): boolean {
    return this.target === "_blank";
  }

  private get isInternal(): boolean {
    return !isExternal(this.link) && !this.isBlankTarget;
  }

  private get target(): string | null {
    if (this.isNonHttpURI) return null;

    if (this.item.target) return this.item.target;

    return isExternal(this.link) ? "_blank" : "";
  }

  private get rel(): string | null {
    if (this.isNonHttpURI) return null;
    if (this.item.rel === false) return null;
    if (this.item.rel) return this.item.rel;

    return this.isBlankTarget ? "noopener noreferrer" : null;
  }

  private focusoutAction(): void {
    this.$emit("focusout");
  }
}
