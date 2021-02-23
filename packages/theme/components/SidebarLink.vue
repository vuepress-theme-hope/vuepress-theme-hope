<script src="./SidebarLink" />

<style lang="stylus">
.sidebar
  .sidebar-links
    ul.sidebar-sub-headers
      padding-left 1rem
      font-size 0.95em

      .has-anchor &
        @media (min-width $MQWide)
          display none

a.sidebar-link
  display inline-block
  box-sizing border-box
  width 100%
  padding 0.35rem 1rem 0.35rem 1.25rem
  border-left 0.2rem solid transparent
  color var(--text-color)
  font-size 1em
  line-height 1.5
  font-weight 400

  &:hover
    color var(--accent-color)

    .iconfont
      color var(--accent-color)

  &.active
    border-left-color var(--accent-color)
    background-color var(--accent-color-a25)
    color var(--accent-color)
    font-weight 600

    .iconfont
      color var(--accent-color)

  .sidebar-group &
    padding-left 2rem

  .sidebar-sub-headers &
    padding-top 0.25rem
    padding-bottom 0.25rem
    border-left none

    &.active
      background-color transparent
      font-weight 500

  .iconfont
    color var(--dark-grey)
</style>
