<template>
  <ul class="article-type-wrapper">
    <li
      v-for="type in types"
      :key="type.text"
      class="article-type"
      :class="{ active: type.path === $route.path }"
      @click="navigate(type.path)"
    >
      <span>{{ type.text }}</span>
    </li>
  </ul>
</template>

<script src="./ArticleType" />

<style lang="stylus">
.article-type-wrapper
  position relative
  padding-left 0
  font-size 18px
  font-weight 600
  display flex
  justify-content center
  align-items center
  list-style none
  z-index 2

  .article-type
    position relative
    vertical-align middle
    margin 0.3em 0.8em
    line-height 1.2
    cursor pointer
    transition all 0.3s ease-in-out

    &::after
      position absolute
      content ' '
      left calc(50% - 10px)
      width 20px
      bottom -6px
      height 2px
      background var(--accent-color)
      border-radius 1px
      visibility hidden
      -webkit-transform scaleX(0)
      transform scaleX(0)
      transition all 0.3s ease-in-out

    &.active
      position relative

      span
        display inline-block
        color var(--accent-color)
        transform scale(1.1, 1.1)

    &:hover, &.active
      &::after
        visibility visible
        -webkit-transform scaleX(1)
        transform scaleX(1)
</style>
