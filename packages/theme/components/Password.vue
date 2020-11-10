<template>
  <div class="password" :class="{ expand: page || isMainPage }">
    <div class="text" :class="{ hasTried }">
      {{ hasTried ? "请输入正确密码" : "请输入密码" }}
    </div>
    <div class="input-wrapper">
      <input v-model="password" type="password" @keypress.enter="verify" />
      <div class="button" @click="verify">OK</div>
    </div>
  </div>
</template>

<script src="./Password" />

<style lang="stylus">
.password
  background var(--bg-color)
  height 90vh - $navbarHeight
  margin-top $navbarHeight
  text-align center
  padding-left $sidebarWidth
  display flex
  flex-direction column
  justify-content center
  align-items center

  @media (max-width $MQNarrow)
    height 90vh - $navbarMobileHeight
    margin-top $navbarMobileHeight
    padding-left $mobileSidebarWidth

  @media (max-width $MQMobile)
    padding-left 0

  &.expand
    padding-left 0 !important
    margin-top 0
    height 400px

  .text
    margin-bottom 20px
    font-weight 600
    font-size 22px
    line-height 2

    &.hasTried
      color red
      animation-name shake
      animation-duration 0.5s
      animation-timing-function ease-out
      animation-fill-mode both

  .input-wrapper
    width 80%
    max-width 600px
    display flex
    justify-content center
    align-items center
    border 2px solid var(--accent-color)
    border-radius 21px
    overflow hidden

    input
      width calc(100% - 60px)
      margin-left 20px
      font-size 20px
      color var(--black) !important
      background var(--bgcolor) !important
      border none
      flex 1
      line-height 2
      letter-spacing 0.5em
      outline none

    .button
      width 60px
      height 42px
      background var(--accent-color)
      line-height 2
      color var(--bgcolor)
      font-size 20px
      cursor pointer

      &:hover
        background lighten($accentColor, 15%)

@keyframes shake
  0%, 100%
    transform translateX(0)

  10%
    transform translateX(-9px)

  20%
    transform translateX(8px)

  30%
    transform translateX(-7px)

  40%
    transform translateX(6px)

  50%
    transform translateX(-5px)

  60%
    transform translateX(4px)

  70%
    transform translateX(-3px)

  80%
    transform translateX(2px)

  90%
    transform translateX(-1px)
</style>
