import { Component, Vue, Watch } from "vue-property-decorator";
import EyeIcon from "@mr-hope/vuepress-shared-utils/icons/EyeIcon.vue";
import FireIcon from "@mr-hope/vuepress-shared-utils/icons/FireIcon.vue";
import { commentOptions, pageInfoI18n } from "./define";
import { Route } from "vue-router";
import { ValineOptions } from "../types";

@Component({ components: { EyeIcon, FireIcon } })
export default class VisitorInfo extends Vue {
  private valineConfig = commentOptions as ValineOptions;

  private count = 0;

  private get valineEnable(): boolean {
    const { valineConfig } = this;

    return Boolean(
      valineConfig &&
        valineConfig.type === "valine" &&
        valineConfig.appId &&
        valineConfig.appKey
    );
  }

  /** Whether enable page view display */
  private get enableVisitor(): boolean {
    if (!this.valineEnable) return false;
    const globalEnable = this.valineConfig.visitor !== false;
    const pageConfig = this.$frontmatter.visitor as boolean;

    return (globalEnable && pageConfig !== false) || pageConfig === true;
  }

  /** visitorID, use current path */
  private get visitorID(): string {
    const { base } = this.$site;

    return base
      ? `${base.slice(0, base.length - 1)}${this.$page.path}`
      : this.$page.path;
  }

  private get hint(): string {
    return pageInfoI18n[this.$localePath || "/"].views;
  }

  private mounted(): void {
    setTimeout(() => {
      this.getCount();
    }, 1500);
  }

  // show fire icon depending on the views number
  private getCount(): void {
    const countElement = document.querySelector(
      ".leancloud_visitors .leancloud-visitors-count"
    );

    if (countElement) {
      const count = countElement.textContent;

      if (count && !isNaN(Number(count))) this.count = Number(count);
      else
        setTimeout(() => {
          this.getCount();
        }, 500);
    }
  }

  @Watch("$route")
  onRouteChange(to: Route, from: Route): void {
    if (to.path !== from.path)
      setTimeout(() => {
        this.getCount();
      }, 500);
  }
}
