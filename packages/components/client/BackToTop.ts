import Vue from "vue";
import debounce from "lodash.debounce";
import { componentI18n } from "./define";

export default Vue.extend({
  name: "BackToTop",

  props: {
    threshold: { type: Number, default: 300 },
  },

  data: () => ({
    /** Scroll distance */
    scrollTop: 0,
  }),

  computed: {
    thresholdDistance(): number {
      return typeof this.$themeConfig.backToTop === "number"
        ? this.$themeConfig.backToTop
        : this.threshold;
    },

    /** Whether to display button */
    isDisplay(): boolean {
      const globalEnable = this.$themeConfig.backToTop !== false;
      const pageEnable = this.$page.frontmatter.backToTop;

      return (
        (pageEnable || (globalEnable && pageEnable !== false)) &&
        this.scrollTop > this.thresholdDistance
      );
    },

    hint(): string {
      return componentI18n[this.$localePath || "/"].backToTop;
    },
  },

  mounted(): void {
    this.scrollTop = this.getScrollTop();
    window.addEventListener(
      "scroll",
      debounce(() => {
        this.scrollTop = this.getScrollTop();
      }, 100)
    );
  },

  methods: {
    // Get scroll distance
    getScrollTop(): number {
      return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    },

    // Scroll to top
    scrollToTop(): void {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.scrollTop = 0;
    },
  },
});
