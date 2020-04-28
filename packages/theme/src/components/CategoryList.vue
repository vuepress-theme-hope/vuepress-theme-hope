<template>
  <ul class="category-list-wrapper">
    <li
      v-for="(category, index) in $category.list"
      :key="category.path"
      class="category"
      :class="{ active: category.name === ($currentCategory || {}).key }"
      @click="clickCategory(category.path)"
    >
      <div class="category-name">
        {{ capitalize(category.name) }}
        <span
          class="category-num"
          :style="{ backgroundColor: color(index) }"
        >{{category.pages.length}}</span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ArticleList from '@theme/components/ArticleList.vue';
import { capitalize } from '@mr-hope/vuepress-shared-utils';
import navigate from '@theme/util/navigate';

@Component({ components: { ArticleList } })
export default class CategoryList extends Vue {
  /** 大写首字母 */
  private capitalize = (name: string) => capitalize(name);

  /** 点击分类的导航 */
  private clickCategory(path: string) {
    navigate(path, this.$router, this.$route);
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
.category-list-wrapper
  position relative
  list-style none
  padding-left 0
  z-index 2

  .category
    vertical-align middle
    margin 4px 8px 10px
    display inline-block
    cursor pointer
    border-radius $borderRadius
    font-size 14px
    border-radius 0.25rem
    box-shadow 0 1px 4px 0 var(--card-shadow-color)
    overflow hidden
    transition all 0.5s

    .category-name
      display flex
      box-sizing border-box
      width 100%
      height 100%
      padding 6px 12px
      justify-content space-between
      align-items center
      color var(--dark-grey)

      &:hover, &.active
        background-color var(--accent-color)
        color var(--white)

      .category-num
        margin-left 4px
        width 1rem
        height 1rem
        text-align center
        line-height 1rem
        border-radius 0.5rem
        font-size 0.7rem
        color var(--white)
</style>
