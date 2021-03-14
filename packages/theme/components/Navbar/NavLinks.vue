<template>
  <nav class="nav-links">
    <!-- user links -->
    <div v-for="item in navLinks" :key="item.link" class="nav-item">
      <DropdownLink v-if="item.type === 'links'" :item="item" />
      <NavLink v-else :item="item" />
    </div>

    <LanguageDropdown />

    <!-- repo link -->
    <a
      v-if="repoLink && $themeConfig.repoDisplay !== false"
      class="repo-link"
      rel="noopener noreferrer"
      :href="repoLink"
      target="_blank"
    >
      {{ repoLabel }}
      <OutboundLink />
    </a>
  </nav>
</template>

<script src="./NavLinks" />

<style lang="stylus">
.nav-links
  display inline-block

  .sidebar &
    display none
    padding 0.5rem 0 0.75rem 0
    border-bottom 1px solid var(--border-color)

    ul
      margin-top 0.25rem

.nav-item
  position relative
  display inline-block
  line-height 2rem

  .navbar &
    margin-left 1rem

  .sidebar &
    display block
    padding 0.5rem 0 0.5rem 1.5rem
    font-size 1.1em
    line-height 1.25rem

  &:first-child
    margin-left 0

  > .nav-link
    .navbar &
      color var(--dark-grey)

      &::after
        position absolute
        content ' '
        left 50%
        right 50%
        bottom 0px
        height 2px
        background var(--accent-color-l10)
        border-radius 1px
        visibility hidden
        transition left 0.2s ease-in-out, right 0.2s ease-in-out

      &.active
        color var(--accent-color)

      &:hover, &.active
        &::after
          left 0
          right 0
          visibility visible

    .sidebar &
      font-weight bold

.repo-link
  color var(--dark-grey)

  .navbar &
    margin-left 1rem

  .sidebar &
    display block
    padding 0.5rem 0 0.5rem 1.5rem
    font-size 1.1em
    line-height 1.25rem
</style>
