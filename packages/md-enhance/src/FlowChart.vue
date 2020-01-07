<template>
  <div :class="{ 'loading': loading }" class="md-flowchart">
    <Loading v-if="loading" class="md-flowchart-loading-icon" />
  </div>
</template>

<script lang='ts'>
import * as flowchart from 'flowchart.js';
import { Component, Prop, Vue } from 'vue-property-decorator';
import Loading from './Loading.vue';
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

    if (!preset) {
      console.warn(`[md-enhance:flowchart] Unknown preset: ${this.preset}`);
      return;
    }

    const { code } = this;

    this.$el.setAttribute('id', this.id);

    const { parse } = flowchart as any;
    const svg = parse(code);

    svg.drawSVG(this.id, preset);
    this.loading = false;
  }
}
</script>

<style lang="stylus">
.md-flowchart
  overflow scroll
  text-align center
  font-size 0px
  min-height 200px
  display flex
  justify-content center
  align-items center
  transition all 1s
  padding 10px

  & > svg
    max-width 100%
    height auto

  &.loading
    background-color #f3f6f8

.operation-element, .parallel-element
  rx 5px
  ry 5px

.md-flowchart-loading-icon
  width 40px
  height 40px
  fill #3eaf7c
</style>
