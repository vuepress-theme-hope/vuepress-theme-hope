<template>
  <ul class="tags-wrapper">
    <li
      v-for="(tag, index) in tags"
      :key="tag"
      class="tag"
      :class="{ active }"
      :style="{ 'border-color': color(index), 'color': color(index) }"
      @click="clickTag(tag)"
    >{{ tag }}</li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop({ type: Array, default: () => [] })
  private readonly tags!: string[];

  private get active() {
    return this.$themeConfig.blog !== false;
  }

  /** 点击标签导航 */
  private clickTag(tagName: string) {
    const path = `/tag/${tagName}/`;
  }

  /** 标签颜色 */
  private color(index: number) {
    const colors = [
      '#e74c3c',
      '#8e44ad',
      '#27ae60',
      '#e67e22',
      '#16a085',
      '#2c3e50',
      '#f39c12',
      '#2ecc71'
    ];
    const finalIndex = index % colors.length;

    return colors[finalIndex];
  }
}
</script>

<style lang="stylus">
.tags-wrapper
  list-style none
  padding-left 0
  margin 0

  .tag
    display inline-block
    position relative
    margin 0 2px
    vertical-align middle
    font-size 12px
    border-radius 12px
    overflow hidden
    transition all 0.5s
    padding 1px 4px
    background-color #f8f8f8
    border-width 0.5px
    border-style solid

    &.active:hover
      cursor pointer
      box-shadow 0 1px 6px 0 rgba(0, 0, 0, 0.2)
      background-color #fff
</style>
