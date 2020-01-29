<template>
  <ul class="tag-list-wrapper">
    <li
      v-for="(tag, index) in tagList.list"
      :key="tag.path"
      class="tag"
      :class="{ active: title === tag.name }"
      @click="clickTag(tag.path)"
    >
      <div class="tag-name">
        {{ tag.name }}
        <span
          class="tag-num"
          :style="{ backgroundColor: color(index) }"
        >{{tag.pages.length}}</span>
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ArticleList from '@theme/components/ArticleList.vue';
import Pagination from '@theme/components/Pagination.vue';

@Component({ components: { ArticleList, Pagination } })
export default class TagList extends Vue {
  /** 渲染的标签列表 */
  @Prop(Object) private readonly tagList!: any;

  @Prop(Object) private readonly currentTag!: any;

  private get title() {
    return (this.currentTag || {}).key;
  }

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
    margin 4px 8px 10px
    display inline-block
    cursor pointer
    border-radius $borderRadius
    font-size 13px
    border-radius 0.25rem
    box-shadow 0 1px 6px 0 rgba(0, 0, 0, 0.2)
    overflow hidden
    transition all 0.5s

    .tag-name
      display flex
      box-sizing border-box
      width 100%
      height 100%
      padding 8px 14px
      justify-content space-between
      align-items center
      color #666

      &:hover, &.active
        background-color $accentColor
        color #fff

      .tag-num
        margin-left 4px
        width 1.2rem
        height 1.2rem
        text-align center
        line-height 1.2rem
        border-radius 0.25rem
        font-size 0.7rem
        color #fff
</style>
