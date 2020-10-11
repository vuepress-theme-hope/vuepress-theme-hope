<template>
  <span v-if="$tags.length !== 0" :aria-label="hint" data-balloon-pos="down">
    <TagIcon />
    <ul class="tags-wrapper">
      <li
        v-for="(tag, index) in $tags"
        :key="tag"
        class="tag"
        :class="{ clickable, [`tag${index % 9}`]: true }"
        :role="clickable ? 'navigation' : ''"
        @click="navigate(tag)"
        v-text="tag"
      />
    </ul>
  </span>
</template>

<script src="./TagInfo" />

<style lang="stylus">
.tags-wrapper
  list-style none
  padding-left 0
  margin 0

  .tag
    display inline-block
    position relative
    vertical-align middle
    margin 0 0.2em
    padding 0 0.2em
    border 0.5px
    border-style solid
    border-radius 0.75em
    background-color #f8f8f8
    font-size 0.75em
    overflow hidden
    transition all 0.5s

    &.clickable:hover
      cursor pointer
      box-shadow 0 1px 6px 0 var(--card-shadow-color, rgba(0, 0, 0, 0.2))
      background-color var(--background-color, #fff)

    .theme-dark &
      background-color #222

@require '~@mr-hope/vuepress-shared-utils/styles/colors.styl'

for $color, $index in $colors
  .tags-wrapper .tag{$index}
    &, .theme-light &
      color lighten($color, 10%)
      border-color lighten($color, 10%)

      &.clickable:hover
        color $color
        border-color $color

    .theme-dark &
      color darken($color, 10%)
      border-color darken($color, 10%)

      &.clickable:hover
        color $color
        border-color $color
</style>
