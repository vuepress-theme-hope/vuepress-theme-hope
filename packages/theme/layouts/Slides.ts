import { Component, Vue } from "vue-property-decorator";
import ClickOutside from "@theme/util/click-outside";

@Component({
  directives: { "click-outside": ClickOutside },
})
export default class Slides extends Vue {
  private showMenu = false;

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
