<template>
  <div :class="{ 'loading': loading }" class="md-flowchart">
    <Loading v-if="loading" class="md-flowchart-loading-icon" />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import Loading from '@mr-hope/vuepress-shared-utils/icons/LoadingIcon.vue';
import { debounce } from 'lodash';
import presets from './presets';

@Component({ components: { Loading } })
export default class FlowChart extends Vue {
  @Prop({ type: String, required: true })
  private readonly id!: string;

  @Prop({ type: String, required: true })
  private readonly code!: string;

  @Prop({ type: String, default: 'vue' })
  private readonly preset!: string;

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

  private mounted() {
    const delay = () => new Promise((resolve) => setTimeout(resolve, 500));

    this.$el.setAttribute('id', this.id);

    Promise.all([
      import(/* webpackChunkName: "flowchart" */ 'flowchart.js') as any,
      delay()
    ]).then(([flowchart]) => {
      const { parse } = flowchart;
      const svg = parse(this.code);
      this.scale = this.getScale(window.innerWidth);

      svg.drawSVG(this.id, { ...this.$preset, scale: this.scale });
      this.loading = false;

      window.addEventListener('resize', this.resize);
    });
  }

  private beforeDestory() {
    window.removeEventListener('resize', this.resize);
  }

  private getScale(width: number) {
    return width < 419 ? 0.8 : width > 1280 ? 1 : 0.9;
  }

  private resize(svg: any) {
    return debounce(() => {
      const scale = this.getScale(window.innerWidth);
      if (this.scale !== scale) {
        this.scale = scale;
        svg.drawSVG(this.id, { ...this.$preset, scale });
      }
    }, 100);
  }
}
</script>

<style lang="stylus">
.md-flowchart
  overflow-x scroll
  text-align center
  transition all 1s
  padding 10px 6px

  &.loading
    display flex
    justify-content center
    align-items center
    background-color var(--grey15, #eee)

  @media (max-width: $MQMobileNarrow)
    margin 0 -1.5rem
    padding 10px 0

  svg.md-flowchart-loading-icon
    width 40px
    height 40px
    margin 40px auto
    fill var(--accent-color, $accentColor)

.operation-element, .parallel-element
  rx 5px
  ry 5px
</style>
