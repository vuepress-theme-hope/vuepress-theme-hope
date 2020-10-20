<template>
  <div :class="{ loading }" class="md-reveal reveal reveal-viewport">
    <Loading v-if="loading" class="md-reveal-loading-icon" />
    <div v-show="!loading" class="slides">
      <section
        data-markdown
        data-separator="^\r?\n---\r?\n$"
        data-separator-vertical="^\r?\n--\r?\n$"
      >
        <script type="text/template">
          {{code}}
        </script>
      </section>
    </div>
  </div>
</template>

<script src="./Reveal" />

<style lang="stylus">
@require '~reveal.js/dist/reveal.css'
@require './styles/highlight'
@require './styles/theme'

.md-reveal
  transition all 1s
  width 100%
  min-height 400px

  &.loading
    display flex
    justify-content center
    align-items center
    background-color var(--grey15, #eee)

  @media (max-width $MQMobileNarrow)
    width calc(100% + 3rem)
    margin 0 -1.5rem
    min-height 300px

  svg.md-reveal-loading-icon
    width 2.5em
    height 2.5em
    margin 2.5em auto
    fill var(--accent-color, $accentColor)
</style>
