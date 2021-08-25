<template>
  <transition name="fade">
    <button
      v-if="isDisplay"
      :aria-label="hint"
      class="back-to-top"
      data-balloon-pos="left"
      @click="scrollToTop"
    >
      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M512 0C229.517 0 0 229.517 0 512s227.752 512 512 512c282.483 0 512-227.752 512-512C1024 229.517 794.483
        0 512 0zM351.338 271.89h305.434c14.125 0 26.483 12.358 26.483 26.482s-12.358 26.483-26.483
        26.483H351.338c-14.124 0-26.483-12.358-26.483-26.483 0-15.89 12.359-26.482 26.483-26.482z
        m331.917 303.669c-12.358 12.358-33.545 12.358-45.903 0L531.42 471.393v270.124c0 14.124-12.359
        26.483-26.483 26.483s-26.483-12.359-26.483-26.483v-271.89l-105.93 104.166c-12.36 12.359-33.546 12.359-45.904
        0-12.359-12.359-12.359-31.78 0-45.903l155.365-151.835c7.062-7.062 14.124-8.827 22.952-8.827s15.89 3.53 22.952
        8.827L683.255 527.89c12.359 15.89 12.359 35.31 0 47.669z"
          fill="currentColor"
        />
      </svg>
    </button>
  </transition>
</template>

<script src="./BackToTop" />

<style lang="stylus">
@require '~@mr-hope/vuepress-shared/styles/reset'

.back-to-top
  button()
  position fixed !important
  right 1rem
  bottom 4rem
  z-index 10
  width 3rem
  height 3rem
  padding 8px

  &:hover
    color var(--accent-color-l25, lighten($accentColor, 25%))
    cursor pointer

  svg
    width 100%
    border-radius 50%
    background var(--bgcolor, #fff)
    color var(--accent-color, $accentColor)
    overflow hidden
    fill currentcolor

.fade-enter-active, .fade-leave-active
  transition opacity 0.3s

.fade-enter, .fade-leave-to
  opacity 0
</style>
