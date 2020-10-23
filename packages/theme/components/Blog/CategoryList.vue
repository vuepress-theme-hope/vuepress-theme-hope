<template>
  <ul class="category-list-wrapper">
    <li
      v-for="(category, index) in $category.list"
      :key="category.path"
      class="category"
      :class="{
        active: category.path === $route.path,
        [`category${index % 9}`]: true,
      }"
      @click="clickCategory(category.path)"
    >
      <div class="category-name">
        {{ capitalize(category.name) }}
        <span class="category-num">{{ category.pages.length }}</span>
      </div>
    </li>
  </ul>
</template>

<script src="./CategoryList" />

<style lang="stylus">
$categoryListTextSize ?= 14px

.category-list-wrapper
  position relative
  list-style none
  padding-left 0
  z-index 2
  font-size $categoryListTextSize

  .category
    display inline-flex
    justify-content space-between
    align-items center
    box-sizing border-box
    vertical-align middle
    margin 0.3em 0.6em 0.8em
    padding 0.4em 0.8em
    border-radius 0.25em
    box-shadow 0 1px 4px 0 var(--card-shadow-color)
    color var(--dark-grey)
    cursor pointer
    overflow hidden
    transition all 0.5s

    @media (max-width $MQMobileNarrow)
      font-size 0.9em

    .category-num
      display inline-block
      min-width 1.4em
      height 1.4em
      margin-left 0.2em
      padding 0.1em 0.2em
      border-radius 0.7em
      color var(--white)
      font-family sans-serif
      font-size 0.7em
      line-height 1.4em
      text-align center

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
