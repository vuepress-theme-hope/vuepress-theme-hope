<script src="./MyBadge" />

<style lang="stylus" scoped>
.badge
  display inline-block
  font-size 14px
  height 18px
  line-height 18px
  border-radius 3px
  padding 0 6px
  color var(--white, #fff)
  background-color #42b983

  &.tip, &.green
    background-color #42b983

  &.error
    background-color #DA5961

  &.warning, &.warn, &.yellow
    background-color darken(#ffe564, 35%)

  &.grey
    background-color #C2CBD2

  & + &
    margin-left 0.3em
</style>
