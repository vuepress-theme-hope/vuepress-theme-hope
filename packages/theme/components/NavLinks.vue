<template>
  <nav v-if="userLinks.length || repoLink" class="nav-links">
    <!-- user links -->
    <div v-for="item in userLinks" :key="item.link" class="nav-item">
      <DropdownLink v-if="item.type === 'links'" :item="item" />
      <NavLink v-else :item="item" />
    </div>

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

  .nav-link
    line-height 1.4rem
    color var(--dark-grey)

    &.active
      color var(--accent-color)

  .nav-item
    position relative
    display inline-block
    margin-left 1.5rem
    line-height 2rem

    &:first-child
      margin-left 0

  .repo-link
    color var(--dark-grey)
    margin-left 1.5rem

@media (max-width $MQMobile)
  .nav-links
    .nav-link
      color var(--text-color)

      &:hover, &.active
        color var(--accent-color)

    .nav-item, .repo-link
      margin-left 0

@media (min-width $MQMobile)
  .nav-item > .nav-link
    &:hover, &.active
      margin-bottom -2px
      border-bottom 2px solid var(--accent-color-l10)

    &.active
      color var(--accent-color)
</style>
