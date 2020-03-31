<template>
  <div :class="{ 'loading': loading }" class="md-flowchart">
    <Loading v-if="loading" class="md-flowchart-loading-icon" />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import Loading from '@mr-hope/vuepress-shared-utils/icons/LoadingIcon.vue';
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

  private mounted() {
    const preset = presets[this.preset];
    const delay = () => new Promise((resolve) => setTimeout(resolve, 500));
    const { code } = this;

    if (!preset) {
      console.warn(`[md-enhance:flowchart] Unknown preset: ${this.preset}`);
      return;
    }

    this.$el.setAttribute('id', this.id);

    Promise.all([
      import(/* webpackChunkName: "flowchart" */ 'flowchart.js') as any,
      delay()
    ]).then(([flowchart]) => {
      const { parse } = flowchart;
      const svg = parse(code);
      svg.drawSVG(this.id, preset);
      this.loading = false;
    });
  }
}
</script>

<style lang="stylus">
.md-flowchart
  overflow-x scroll
  text-align center
  min-height 200px
  transition all 1s
  padding 10px 6px

  &.loading
    display flex
    justify-content center
    align-items center
    background-color #f3f6f8

  @media (max-width: $MQMobileNarrow)
    margin 0 -1.5rem
    padding 10px 0

  svg.md-flowchart-loading-icon
    width 40px
    height 40px
    fill $accentColor

.operation-element, .parallel-element
  rx 5px
  ry 5px
</style>
