<template>
  <div :class="{ 'loading': loading }" class="md-flowchart">
    <Loading class="md-flowchart-loading-icon" v-if="loading" />
  </div>
</template>

<script>
import Loading from './Loading.vue';
import presets from './presets/index';

export default {
  name: 'FlowChart',

  components: { Loading },

  props: {
    id: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    preset: {
      type: String,
      default: 'vue'
    }
  },

  data: () => ({
    loading: true
  }),

  mounted() {
    const preset = presets[this.preset];

    if (!preset) {
      console.warn(`[md-enhance:flowchart] Unknown preset: ${this.preset}`);
      return;
    }

    const { code } = this;

    this.$el.setAttribute('id', this.id);
    const delay = () => new Promise(resolve => setTimeout(resolve, 500));

    Promise.all([
      import(/* webpackChunkName: "flowchart" */ 'flowchart.js'),
      delay()
    ]).then(([flowchart]) => {
      const { parse } = flowchart.default;
      const svg = parse(code);

      svg.drawSVG(this.id, preset);
      this.loading = false;
    });
  }
};
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
