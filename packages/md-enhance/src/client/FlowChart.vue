<template>
  <div :class="{ loading }" class="md-flowchart">
    <Loading v-if="loading" class="md-flowchart-loading-icon" />
  </div>
</template>

<script src="./FlowChart" />

<style lang="stylus">
.md-flowchart
  overflow-x scroll
  text-align center
  transition all 1s
  padding 0.6em 0.4em

  &.loading
    display flex
    justify-content center
    align-items center
    background var(--grey15, #eee)

  @media (max-width $MQMobileNarrow)
    margin 0 -1.5rem
    padding 0.6em 0

  svg.md-flowchart-loading-icon
    width 4em
    height 4em
    margin 2.5em auto
    color var(--accent-color, $accentColor)

.operation-element, .parallel-element
  rx 5px
  ry 5px
</style>
