import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { ValineOptions } from "../types";
import { i18n } from "@mr-hope/vuepress-shared-utils";

@Component
export default class Valine extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  private readonly valineConfig!: ValineOptions;

  private get valineEnable(): boolean {
    const { valineConfig } = this;

    return Boolean(valineConfig && valineConfig.appId && valineConfig.appKey);
  }

  private get commentDisplay(): boolean {
    if (!this.valineEnable) return false;
    const globalEnable = this.valineConfig.comment !== false;
    const pageEnable = this.$page.frontmatter.comment as boolean | undefined;

    return (globalEnable && pageEnable !== false) || pageEnable === true;
  }

  /** Whether to display view number */
  private get visitorDisplay(): boolean {
    if (!this.valineEnable) return false;
    const globalEnable = this.valineConfig.visitor !== false;
    const pageEnable = this.$page.frontmatter.visitor as boolean | undefined;

    return (globalEnable && pageEnable !== false) || pageEnable === true;
  }

  private mounted(): void {
    if (this.valineEnable) {
      // eslint-disable-next-line
      const AV = require("leancloud-storage");

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      if (typeof window !== "undefined") window.AV = AV;
    }

    this.valine(this.$route.path);
  }

  @Watch("$route")
  onRouteChange(to: Route, from: Route): void {
    if (to.path !== from.path)
      // Refresh comment when navigating to a new page
      Vue.nextTick(() => {
        this.valine(to.path);
      });
  }

  // Init valine
  private valine(path: string): void {
    const { valineConfig } = this;
    // eslint-disable-next-line
    const valine = new (require("valine"))();

    // eslint-disable-next-line
    valine.init({
      el: "#valine",
      appId: valineConfig.appId, // Your appId
      appKey: valineConfig.appKey, // Your appKey
      placeholder:
        valineConfig.placeholder ||
        i18n.getLocale(this.$lang).valineHolder ||
        i18n.getDefaultLocale().valineHolder,
      meta: valineConfig.meta || ["nick", "mail", "link"],
      requiredFields: valineConfig.requiredFields || ["nick"],
      avatar: valineConfig.avatar || "retro",
      visitor: this.visitorDisplay,
      recordIP: valineConfig.recordIP || false,
      path:
        path || (typeof window === "undefined" ? "" : window.location.pathname),
      pageSize: valineConfig.pageSize || 10,
      enableQQ: valineConfig.enableQQ || true,
      emojiCDN: valineConfig.emojiCDN || "",
      emojiMaps: valineConfig.emojiMaps || null,
      lang: this.$lang === "zh-CN" ? "zh-CN" : "en",
    });
  }
}
