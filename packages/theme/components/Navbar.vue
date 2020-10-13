<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <RouterLink ref="siteInfo" :to="$localePath" class="home-link">
      <img
        v-if="$themeConfig.logo"
        class="logo"
        :class="{ light: Boolean($themeConfig.darkLogo) }"
        :src="$withBase($themeConfig.logo)"
        :alt="$siteTitle"
      />
      <img
        v-if="$themeConfig.darkLogo"
        class="logo dark"
        :src="$withBase($themeConfig.darkLogo)"
        :alt="$siteTitle"
      />
      <span
        v-if="$siteTitle"
        :class="{ 'can-hide': $themeConfig.logo }"
        class="site-name"
        >{{ $siteTitle }}</span
      >
    </RouterLink>

    <div
      :style="
        linksWrapMaxWidth
          ? {
              'max-width': `${linksWrapMaxWidth}px`,
            }
          : {}
      "
      class="links"
    >
      <ThemeColor />
      <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" />
      <SearchBox
        v-else-if="
          $themeConfig.search !== false && $page.frontmatter.search !== false
        "
      />
      <NavLinks class="can-hide" />
    </div>
  </header>
</template>

<script src="./Navbar" />

<style lang="stylus">
.navbar
  position fixed
  z-index 20
  top 0
  left 0
  right 0
  height $navbarHeight
  padding $navbar-vertical-padding $navbar-horizontal-padding
  background-color var(--background-color)
  box-sizing border-box
  line-height $navbarHeight - 1.4rem
  box-shadow 0 2px 8px var(--card-shadow-color)

  a, span, img
    display inline-block

  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top

    .theme-light &
      &.light
        display block

      &.dark
        display none

    .theme-dark &
      &.light
        display none

      &.dark
        display block

  .site-name
    font-size 1.3rem
    font-weight 600
    color var(--text-color)
    position relative

  .links
    padding-left 1.5rem
    box-sizing border-box
    background-color var(--background-color)
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex

    .search-box
      flex 0 0 auto
      vertical-align top

@media (max-width $MQMobile)
  .navbar
    padding-left 4rem

    .can-hide
      display none

    .site-name
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis

    .links
      padding-left 1.5rem
</style>
