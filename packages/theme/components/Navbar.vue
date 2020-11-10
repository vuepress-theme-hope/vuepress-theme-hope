<template>
  <header class="navbar" :class="{ 'can-hide': canHide }">
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
  padding $navbarVerticalPadding $navbarHorizontalPadding
  background var(--bgcolor-blur)
  box-sizing border-box
  box-shadow 0 2px 8px var(--card-shadow-color)
  backdrop-filter saturate(200%) blur(20px)
  line-height $navbarHeight - $navbarVerticalPadding * 2
  transition transform 0.3s ease-in-out

  @media (max-width $MQMobile)
    height $navbarMobileHeight
    padding $navbarMobileVerticalPadding $navbarMobileHorizontalPadding
    padding-left $navbarMobileHorizontalPadding + 2.4rem
    line-height $navbarMobileHeight - $navbarMobileVerticalPadding * 2

  .hide-navbar &.can-hide
    transform translateY(-100%)

  a, span, img
    display inline-block

  .home-link:hover .site-name
    color var(--accent-color)

  .logo
    min-width $navbarHeight - $navbarVerticalPadding * 2
    height $navbarHeight - $navbarVerticalPadding * 2
    margin-right 0.8rem
    vertical-align top

    @media (max-width $MQMobile)
      min-width $navbarMobileHeight - $navbarMobileVerticalPadding * 2
      height $navbarMobileHeight - $navbarMobileVerticalPadding * 2

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

  .can-hide
    @media (max-width $MQMobile)
      display none

  .site-name
    font-size 1.3rem
    font-weight 600
    color var(--text-color)
    position relative

    @media (max-width $MQMobile)
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis

  .links
    position absolute
    top $navbarVerticalPadding
    right $navbarHorizontalPadding
    display flex
    box-sizing border-box
    padding-left 1.5rem
    font-size 0.9rem
    white-space nowrap

    @media (max-width $MQMobile)
      padding-left 0
      top $navbarMobileVerticalPadding
      right $navbarMobileHorizontalPadding
</style>
