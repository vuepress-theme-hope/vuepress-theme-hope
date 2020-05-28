<template>
  <transition name="fade">
    <svg
      v-if="isDisplay"
      class="back-to-top"
      role="button"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      @click="scrollToTop"
    >
      <path
        d="M512 0C229.517 0 0 229.517 0 512s227.752 512 512 512c282.483 0 512-227.752 512-512C1024 229.517 794.483
        0 512 0zM351.338 271.89h305.434c14.125 0 26.483 12.358 26.483 26.482s-12.358 26.483-26.483
        26.483H351.338c-14.124 0-26.483-12.358-26.483-26.483 0-15.89 12.359-26.482 26.483-26.482z
        m331.917 303.669c-12.358 12.358-33.545 12.358-45.903 0L531.42 471.393v270.124c0 14.124-12.359
        26.483-26.483 26.483s-26.483-12.359-26.483-26.483v-271.89l-105.93 104.166c-12.36 12.359-33.546 12.359-45.904
        0-12.359-12.359-12.359-31.78 0-45.903l155.365-151.835c7.062-7.062 14.124-8.827 22.952-8.827s15.89 3.53 22.952
        8.827L683.255 527.89c12.359 15.89 12.359 35.31 0 47.669z"
        fill="currentColor"
      />
    </svg>
  </transition>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import debounce = require("lodash.debounce");

@Component
export default class BackToTop extends Vue {
  @Prop({ type: Number, default: 300 })
  private readonly threshold!: number;

  /** Scroll distance */
  private scrollTop = 0;

  private get thresholdDistance() {
    return typeof this.$themeConfig.backtotop === "number"
      ? this.$themeConfig.backtotop
      : this.threshold;
  }

  /** Whether to display button */
  private get isDisplay() {
    const globalEnable = this.$themeConfig.backtotop !== false;
    const pageEnable = this.$page.frontmatter.backtotop;

    return (
      (pageEnable || (globalEnable && pageEnable !== false)) &&
      this.scrollTop > this.thresholdDistance
    );
  }

  private mounted() {
    this.scrollTop = this.getScrollTop();
    window.addEventListener(
      "scroll",
      debounce(() => {
        this.scrollTop = this.getScrollTop();
      }, 100)
    );
  }

  // Get scroll distance
  private getScrollTop() {
    return (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  }

  // Scroll to top
  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.scrollTop = 0;
  }
}
</script>

<style lang='stylus'>
.back-to-top
  cursor pointer
  position fixed
  bottom 5rem
  right 2rem
  width 2rem
  color var(--accent-color, $accentColor)
  background-color var(--background-color, #fff)
  border-radius 50%
  overflow hidden
  z-index 1
  fill currentcolor

.back-to-top:hover
  color var(--accent-color-l25, lighten($accentColor, 25%))

.fade-enter-active, .fade-leave-active
  transition opacity 0.3s

.fade-enter, .fade-leave-to
  opacity 0
</style>
