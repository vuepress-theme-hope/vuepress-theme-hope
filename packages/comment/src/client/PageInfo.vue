<template>
  <div class="page-title" vocab="https://schema.org/" typeof="Article">
    <h1>
      <i
        v-if="$frontmatter.icon"
        :class="`iconfont ${iconPrefix}${$frontmatter.icon}`"
      />
      <span property="headline">{{ $page.title }}</span>
    </h1>
    <div v-if="config" class="page-info">
      <span v-if="isOriginal" class="origin" v-text="originText" />
      <component
        :is="`${item}-info`"
        v-for="item in config"
        :key="$route.path + item"
      />
    </div>
    <meta
      v-if="$frontmatter.image"
      property="image"
      :content="$withBase($frontmatter.image)"
    />
    <hr />
  </div>
</template>

<script src="./PageInfo" />

<style lang="stylus">
@require '~@mr-hope/vuepress-shared/styles/wrapper'

$pageInfoTextSize ?= 14px

.page
  .page-title
    @extend $wrapper
    padding-bottom 0.2rem
    position relative
    z-index 1

    h1
      margin-top -3.1rem !important
      padding-top 4.6rem !important
      margin-bottom 0.5rem

      .iconfont
        color var(--accent-color, $accentColor)
        font-size 0.9em

  .page-title + .theme-default-content:not(.custom)
    padding-top 0

  .page-info
    display flex
    justify-content flex-start
    align-content stretch
    align-items center
    flex-wrap wrap
    color var(--dark-grey, #666)
    font-size $pageInfoTextSize
    font-family Arial, Helvetica, sans-serif

    & > span
      display flex
      align-items center
      flex-shrink 0
      margin-right 0.5em
      line-height 2

      @media (min-width $MQWide)
        font-size 1.1em

      @media (max-width $MQMobileNarrow)
        font-size 0.875em

      &.origin
        display inline-block
        position relative
        vertical-align middle
        margin 0 0.5em
        padding 0 0.5em
        border 0.5px solid var(--dark-grey)
        border-radius 0.75em
        background var(--bg-color)
        font-size 0.75em
        line-height 1.5
        overflow hidden

    .icon
      width 1em
      height 1em
      margin-right 0.25em

  .theme-default-content:not(.custom) > h1:first-child
    display none
</style>
