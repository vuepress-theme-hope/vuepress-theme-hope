<template>
  <!-- eslint-disable vue/no-v-html -->
  <section class="article">
    <StickyIcon v-if="article.frontmatter.sticky" />
    <RouterLink class="title" tag="header" :to="article.path">
      <LockIcon v-if="isEncrypted" />
      {{ article.title }}
    </RouterLink>
    <div
      v-if="article.excerpt"
      class="article-excerpt"
      v-html="article.excerpt"
    />
    <hr class="hr" />
    <ArticleInfo :article="article" />
  </section>
</template>

<script src="./ArticleItem" />

<style lang="stylus">
.article-wrapper
  .article
    position relative
    margin 0 auto 20px
    padding 16px 20px
    width 100%
    background-color var(--background-color)
    border-radius 6px
    box-shadow 0 1px 3px 0 var(--card-shadow-color)
    box-sizing border-box
    -webkit-transition all 0.3s
    transition all 0.3s

    @media (max-width $MQMobileNarrow)
      border-radius 0

    &:last-child
      margin-bottom 0

    &:hover
      box-shadow 0 2px 6px 0 var(--card-shadow-color)

    .sticky-icon
      position absolute
      top 0
      right 0
      width 40px
      height 40px
      fill var(--accent-color)

      .sticky-text
        fill var(--white)

    .title
      position relative
      font-size 1.28rem
      line-height 36px
      display inline-block

      &::after
        content ''
        position absolute
        width 100%
        height 2px
        bottom 0
        left 0
        background-color var(--accent-color)
        visibility hidden
        -webkit-transform scaleX(0)
        transform scaleX(0)
        transition 0.3s ease-in-out

      &:hover
        cursor pointer

        &::after
          visibility visible
          -webkit-transform scaleX(1)
          transform scaleX(1)

      .lock-icon
        display inline-block
        vertical-align baseline
        width 20px
        height 20px
        fill var(--accent-color)

    .article-excerpt
      h1
        display none

      h1+p
        margin-top 0.5em

      p
        &:first-child
          margin-top 0.5em

        &:last-child
          margin-bottom 0.5em
</style>
