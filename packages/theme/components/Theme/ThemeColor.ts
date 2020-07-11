import { Component, Vue } from "vue-property-decorator";
import ClickOutside from "@theme/util/click-outside";
import ThemeOptions from "@theme/components/Theme/ThemeOptions.vue";

@Component({
  directives: { "click-outside": ClickOutside },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  components: { ThemeOptions },
})
export default class ThemeColor extends Vue {
  private showMenu = false;

  private clickOutside(): void {
    this.showMenu = false;
  }
}
