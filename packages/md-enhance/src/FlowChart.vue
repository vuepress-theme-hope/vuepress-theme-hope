<template>
  <div :class="{ 'loading': loading }" class="md-flowchart">
    <Loading v-if="loading" class="md-flowchart-loading-icon" />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import Loading from "@mr-hope/vuepress-shared-utils/icons/LoadingIcon.vue";
import debounce = require("lodash.debounce");
import presets from "./presets";

let svg: any;

@Component({ components: { Loading } })
export default class FlowChart extends Vue {
  @Prop({ type: String, required: true })
  private readonly id!: string;

  @Prop({ type: String, required: true })
  private readonly code!: string;

  @Prop({ type: String, default: "vue" })
  private readonly preset!: "ant" | "vue";

  private loading = true;

  private scale = 1;

  private get $preset() {
    const preset = presets[this.preset];

    if (!preset) {
      console.warn(`[md-enhance:flowchart] Unknown preset: ${this.preset}`);
      return presets.vue;
    }

    return preset;
  }

  private get resize() {
    return debounce(() => {
      const scale = this.getScale(window.innerWidth);

      if (this.scale !== scale) {
        this.scale = scale;
        svg.drawSVG(this.id, { ...this.$preset, scale });
      }
    }, 100);
  }

  private mounted() {
    const delay = () => new Promise((resolve) => setTimeout(resolve, 500));

    this.$el.setAttribute("id", this.id);

    Promise.all([
      import(/* webpackChunkName: "flowchart" */ "flowchart.js"),
      delay(),
    ]).then(([flowchart]) => {
      const { parse } = flowchart;

      svg = parse(this.code);
      this.scale = this.getScale(window.innerWidth);

      svg.drawSVG(this.id, { ...this.$preset, scale: this.scale });
      this.loading = false;

      window.addEventListener("resize", this.resize);
    });
  }

  private beforeDestory() {
    window.removeEventListener("resize", this.resize);
  }

  private getScale(width: number) {
    return width < 419 ? 0.8 : width > 1280 ? 1 : 0.9;
  }
}
</script>

<style lang="stylus">
.md-flowchart
  overflow-x scroll
  text-align center
  transition all 1s
  padding 0.6em 0.4em

  &.loading
    display flex
    justify-content center
    align-items center
    background-color var(--grey15, #eee)

  @media (max-width: $MQMobileNarrow)
    margin 0 -1.5rem
    padding 0.6em 0

  svg.md-flowchart-loading-icon
    width 2.5em
    height 2.5em
    margin 2.5em auto
    fill var(--accent-color, $accentColor)

.operation-element, .parallel-element
  rx 5px
  ry 5px
</style>
