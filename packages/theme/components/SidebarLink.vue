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
  border-left 0.25rem solid transparent
  color var(--text-color)
  font-size 1em
  line-height 1.4
  font-weight 400

  &:hover
    color var(--accent-color)

  &.active
    font-weight 600
    color var(--accent-color)
    border-left-color var(--accent-color)

  .sidebar-group &
    padding-left 2rem

  .sidebar-sub-headers &
    padding-top 0.25rem
    padding-bottom 0.25rem
    border-left none

    &.active
      font-weight 500
</style>
