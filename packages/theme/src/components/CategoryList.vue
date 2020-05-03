<template>
  <ul class="category-list-wrapper">
    <li
      v-for="(category, index) in $category.list"
      :key="category.path"
      class="category"
      :class="{ active: category.path === $route.path, [`category${index % 9}`]:true }"
      @click="clickCategory(category.path)"
    >
      <div class="category-name">
        {{ capitalize(category.name) }}
        <span class="category-num">{{category.pages.length}}</span>
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
}
</script>

<style lang="stylus">
.category-list-wrapper
  position relative
  list-style none
  padding-left 0
  z-index 2

  .category
    display inline-flex
    justify-content space-between
    align-items center
    box-sizing border-box
    vertical-align middle
    margin 4px 8px 10px
    padding 6px 12px
    border-radius 0.25rem
    box-shadow 0 1px 4px 0 var(--card-shadow-color)
    color var(--dark-grey)
    font-size 14px
    cursor pointer
    overflow hidden
    transition all 0.5s

    .category-num
      display inline-block
      margin-left 4px
      min-width 1rem
      height 1rem
      text-align center
      line-height 1rem
      border-radius 0.5rem
      font-size 0.7rem
      color var(--white)

@require '~@mr-hope/vuepress-shared-utils/styles/colors.styl'

for $color, $index in $colors
  .category-list-wrapper .category{$index}
    &, .theme-light &
      background-color lighten($color, 90%)

      &:hover
        background-color lighten($color, 75%)

      &.active
        color var(--white)
        background-color var(--accent-color)

    .theme-dark &
      background-color darken($color, 75%)

      &:hover
        background-color darken($color, 60%)

      &.active
        color var(--white)
        background-color var(--accent-color-d10)

    .category-num
      background-color $color
</style>
