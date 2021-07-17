<template>
  <span v-if="$tags.length !== 0" :aria-label="hint" data-balloon-pos="down">
    <TagIcon />
    <ul class="tags-wrapper">
      <li
        v-for="(tag, index) in $tags"
        :key="tag"
        class="tag"
        :class="{ clickable, [`tag${index % 9}`]: true }"
        @click="navigate(tag)"
      >
        <span :role="clickable ? 'navigation' : ''" v-text="tag" />
      </li>
    </ul>
    <meta property="keywords" :content="$tags.join(',')" />
  </span>
</template>

<script src="./TagInfo" />

<style lang="stylus">
.tags-wrapper
  list-style none
  margin 0
  padding-left 0

  .tag
    display inline-block
    position relative
    vertical-align middle
    min-width 1.5em
    margin 0 0.2em
    padding 0 0.2em
    border-width 0.5px
    border-style solid
    border-radius 0.75em
    background #f8f8f8
    font-size 0.75em
    text-align center
    overflow hidden
    transition all 0.2s

    .theme-dark &
      background #222

    &.clickable:hover
      cursor pointer
      background var(--bgcolor, #fff)
      box-shadow 0 1px 6px 0 var(--card-shadow-color, rgba(0, 0, 0, 0.2))

@require '~@mr-hope/vuepress-shared/styles/colors.styl'

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
