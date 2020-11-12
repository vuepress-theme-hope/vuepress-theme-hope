<template>
  <nav :class="['breadcrumb', { disable: !enable }]">
    <ul v-if="enable">
      <li
        v-for="(item, index) in config"
        :key="item.url"
        :class="{ 'is-active': config.length - 1 === index }"
      >
        <a
          class="iconfont"
          :class="item.icon && iconEnable ? `${iconPrefix}${item.icon}` : ''"
          @click="$router.push(item.url)"
          v-text="item.title"
        />
      </li>
    </ul>
  </nav>
</template>

<script src="./BreadCrumb" />

<style lang="stylus">
@require '~@mr-hope/vuepress-shared-utils/styles/wrapper.styl'

$navbarMobileHeight ?= 3.2rem

// Fix top boarder of heading1
.theme-default-content:not(.custom)
  > *:first-child
    margin-top 0

h1, h2, h3, h4, h5, h6
  .theme-default-content:not(.custom) &:first-child
    margin-top 0.5rem - $navbarHeight !important
    padding-top $navbarHeight + 1rem !important

    @media (max-width $MQMobile)
      margin-top 0.5rem - $navbarMobileHeight !important
      padding-top $navbarMobileHeight + 1rem !important

.breadcrumb
  @extend $wrapper
  position relative
  margin-top $navbarHeight
  margin-bottom (- $navbarHeight)
  padding-top 0.2rem
  padding-bottom 0.2rem
  font-size 15px
  z-index 2

  @media (max-width $MQNarrow)
    margin-top $navbarMobileHeight
    margin-bottom (- $navbarMobileHeight)
    font-size 14px

  @media (max-width $MQMobileNarrow)
    font-size 12.8px

  // breadcrumb is disabled
  &.disable
    padding-bottom 1.3em

  .iconfont
    font-size inherit

    &:before
      display inline-block
      vertical-align middle
      line-height 1

  ul
    padding-left 0px
    list-style none

    li
      display inline-block

      &:first-child a
        padding-left 0

      &:last-child a
        padding-right 0

      &.is-active a
        color var(--light-grey, #999)
        cursor default
        pointer-events none

      a
        padding 0 0.5em

        &:before
          position relative
          bottom 0.125rem
          margin-right 0.25em

        &:hover
          cursor pointer
          text-decoration underline

    li
      & + li::before
        color var(--light-grey, #999)
        content '\0002f'
</style>
