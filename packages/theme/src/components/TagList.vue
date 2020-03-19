<template>
  <ul class="tag-list-wrapper">
    <li
      v-for="(tag, index) in $tag.list"
      :key="tag.path"
      class="tag"
      :class="{ active: tag.name === ($currentTag || {}).key }"
      :style="{ backgroundColor: color(index) }"
      @click="clickTag(tag.path)"
    >
      <div class="tag-name">{{ tag.name }}</div>
    </li>
  </ul>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ArticleList from '@theme/components/ArticleList.vue';
import Pagination from '@theme/components/Pagination.vue';

@Component({ components: { ArticleList, Pagination } })
export default class TagList extends Vue {
  /** 点击标签导航 */
  private clickTag(path: string) {
    if (path !== this.$route.path) this.$router.push(path);
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
.tag-list-wrapper
  list-style none
  padding-left 0

  .tag
    vertical-align middle
    margin 4px 6px 8px
    display inline-block
    cursor pointer
    border-radius $borderRadius
    font-size 12px
    border-radius 14px
    box-shadow 0 1px 6px 0 rgba(0, 0, 0, 0.2)
    overflow hidden
    transition all 0.5s
    padding 4px 8px
    color #fff

    &:hover
      position relative
      top 0.5px
      left 0.5px

    &.active
      font-size 14px
</style>
