<template>
  <ul class="article-type-wrapper">
    <li
      v-for="type in types"
      :key="type.text"
      class="article-type"
      :class="{ active: type.path === $route.path }"
      @click="navigate(type.path)"
    >
      {{ type.text }}
    </li>
  </ul>
</template>

<script src="./ArticleType" />

<style lang="stylus">
.article-type-wrapper
  position relative
  list-style none
  padding-left 0
  z-index 2
  font-size 18px
  font-weight 600

  .article-type
    position relative
    display inline-block
    box-sizing border-box
    vertical-align middle
    margin 0.3em 0.8em
    cursor pointer
    line-height 1.2

    &.active
      font-size 20px
      margin-bottom 0.2em
      border-bottom 0.1em solid var(--accent-color)
      transform scale(1.2, 1.2)
</style>
