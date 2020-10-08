import { defineComponent, ref } from "@vue/composition-api";
import * as screenfull from "screenfull";
import { Screenfull } from "screenfull";

export default defineComponent({
  name: "ScreenFull",

  setup() {
    const canFullscreen = ref(false);
    const isFullscreen = ref(false);

    const click = (): void => {
      if (screenfull.isEnabled)
        void screenfull.toggle().then(() => {
          isFullscreen.value = (screenfull as Screenfull).isFullscreen;
        });
    };

    return {
      canFullscreen,
      click,
      isFullscreen,
    };
  },

  mounted(): void {
    this.canFullscreen =
      screenfull.isEnabled && this.$themeConfig.fullscreen !== false;
  },
});
