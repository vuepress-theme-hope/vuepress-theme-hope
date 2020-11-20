import { Component, Vue } from "vue-property-decorator";
import { Screenfull } from "screenfull";
import * as screenfull from "screenfull";

@Component
export default class ScreenFull extends Vue {
  private canFullscreen = false;

  private isFullscreen = false;

  private click(): void {
    if (screenfull.isEnabled)
      void screenfull.toggle().then(() => {
        this.isFullscreen = (screenfull as Screenfull).isFullscreen;
      });
  }

  private mounted(): void {
    this.canFullscreen =
      screenfull.isEnabled && this.$themeConfig.fullscreen !== false;
  }
}
