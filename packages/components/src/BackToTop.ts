import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "BackToTop",

  props: {
    threshold: { type: Number, default: 300 },
  },

  setup() {
    const display = ref(false);

    return { display };
  },

  computed: {
    /** Whether to display button */
    isDisplay(): boolean {
      const globalEnable = this.$themeConfig.backToTop !== false;
      const pageEnable = this.$page.frontmatter.backToTop as boolean | false;

      return (
        (pageEnable || (globalEnable && pageEnable !== false)) && this.display
      );
    },
  },

  mounted(): void {
    const thresholdDistance =
      typeof this.$themeConfig.backToTop === "number"
        ? this.$themeConfig.backToTop
        : this.threshold;

    window.addEventListener("scroll", () => {
      this.display = this.getDistance() > thresholdDistance;
    });
  },

  methods: {
    // Get scroll distance
    getDistance: (): number =>
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      window.pageYOffset,

    // Scroll to top
    scrollTop(): void {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
});
