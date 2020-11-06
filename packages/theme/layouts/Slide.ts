import { Component, Vue } from "vue-property-decorator";
import ClickOutside from "@theme/util/click-outside";
import ThemeColor from "@theme/components/Theme/ThemeColor.vue";

@Component({
  components: { ThemeColor },
  directives: { "click-outside": ClickOutside },
})
export default class Slide extends Vue {
  private showMenu = false;

  private destroyed(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.querySelector("html")!.classList.remove("reveal-full-page");
    document.body.classList.remove("reveal-viewport");
    document.body.style.removeProperty("--slide-width");
    document.body.style.removeProperty("--slide-height");
  }

  private toggle(): void {
    this.showMenu = !this.showMenu;
  }

  private back(): void {
    window.history.go(-1);
    this.showMenu = false;
  }

  private home(): void {
    void this.$router.push("/");
    this.showMenu = false;
  }

  private clickOutside(): void {
    this.showMenu = false;
  }
}
