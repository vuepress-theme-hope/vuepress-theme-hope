import { Component, Prop, Vue } from "vue-property-decorator";
import debounce from "lodash.debounce";

@Component
export default class BackToTop extends Vue {
  @Prop({ type: Number, default: 300 })
  private readonly threshold!: number;

  /** Scroll distance */
  private scrollTop = 0;

  private get thresholdDistance(): number {
    return typeof this.$themeConfig.backToTop === "number"
      ? this.$themeConfig.backToTop
      : this.threshold;
  }

  /** Whether to display button */
  private get isDisplay(): boolean {
    const globalEnable = this.$themeConfig.backToTop !== false;
    const pageEnable = this.$page.frontmatter.backToTop as boolean | false;

    return (
      (pageEnable || (globalEnable && pageEnable !== false)) &&
      this.scrollTop > this.thresholdDistance
    );
  }

  private mounted(): void {
    this.scrollTop = this.getScrollTop();
    window.addEventListener(
      "scroll",
      debounce(() => {
        this.scrollTop = this.getScrollTop();
      }, 100)
    );
  }

  // Get scroll distance
  private getScrollTop(): number {
    return (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  }

  // Scroll to top
  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.scrollTop = 0;
  }
}
