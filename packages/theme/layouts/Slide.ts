import Vue from "vue";
import ClickOutside from "@theme/utils/click-outside";
import ThemeColor from "@theme/components/Theme/ThemeColor.vue";

export default Vue.extend({
  name: "Slide",

  components: { ThemeColor },

  directives: { "click-outside": ClickOutside },

  data: () => ({
    showMenu: false,
  }),

  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  destroyed(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.querySelector("html")!.classList.remove("reveal-full-page");
    document.body.classList.remove("reveal-viewport");
    document.body.style.removeProperty("--slide-width");
    document.body.style.removeProperty("--slide-height");
  },

  methods: {
    toggle(): void {
      this.showMenu = !this.showMenu;
    },

    back(): void {
      window.history.go(-1);
      this.showMenu = false;
    },

    home(): void {
      void this.$router.push("/");
      this.showMenu = false;
    },

    clickOutside(): void {
      this.showMenu = false;
    },
  },
});
