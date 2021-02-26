<script src="./Badge" />

<style lang="stylus" scoped>
.badge
  display inline-block
  font-size 14px
  height 18px
  line-height 18px
  border-radius 3px
  padding 0 6px
  color var(--white, #fff)
  background #42b983

  &.tip, &.green
    background #42b983

  &.error
    background #DA5961

  &.warning, &.warn, &.yellow
    background darken(#ffe564, 35%)

  &.grey
    background #C2CBD2

  & + &
    margin-left 0.3em

  // toc
  .table-of-contents &
    vertical-align middle
</style>
