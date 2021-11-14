import Vue from "vue";
import * as screenfull from "screenfull";

export default Vue.extend({
  name: "ScreenFull",

  data: () => ({
    canFullscreen: false,
    isFullscreen: false,
  }),

  mounted(): void {
    this.canFullscreen =
      screenfull.isEnabled && this.$themeConfig.fullscreen !== false;
  },

  methods: {
    click(): void {
      if (screenfull.isEnabled)
        void screenfull.toggle().then(() => {
          this.isFullscreen = screenfull.isFullscreen;
        });
    },
  },
});
