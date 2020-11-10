<script src="./Anchor" />

<style lang="stylus">
$headings = 2 3 4 5 6

#anchor
  display none
  position fixed
  top ($navbarHeight + 2.5rem)
  right 0.5rem
  min-width 10rem
  max-width 15rem
  max-height 80vh
  overflow-y scroll

  @media (min-width $MQWide)
    .has-anchor &
      display block

  &::-webkit-scrollbar-track-piece
    background transparent

  .anchor-wrapper
    position relative
    padding-left 8px

    &::after
      content ' '
      position absolute
      top 15px
      left 4px
      bottom 15px
      width 4px
      margin-left -2px
      background var(--border-color)
      z-index -1

    > .anchor-list
      margin 0

    .anchor-list
      padding-left 0

      .anchor
        box-sizing border-box
        padding 0px 8px
        line-height 1.5
        list-style none

        .anchor-link
          display inline-block
          position relative
          max-width 100%
          color var(--light-grey)

          > div
            text-overflow ellipsis
            white-space nowrap
            overflow hidden

          &::before
            content ' '
            position absolute
            z-index 2
            top 50%
            width 6px
            height 6px
            margin-left -3px
            margin-top -3px
            background var(--bgcolor)
            border 1px solid var(--border-color)
            border-radius 50%

          &:hover, &.active
            color var(--accent-color)

            &::before
              background var(--accent-color)

        for $heading in $headings
          &.anchor{$heading} .anchor-link
            font-size (16 - $heading)px

            &::before
              left (-8 * $heading + 4)px
</style>
