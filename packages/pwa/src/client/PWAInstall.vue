<template>
  <div id="pwa-install">
    <button
      v-if="showInstall"
      class="modal-button"
      :use-hint="useHint"
      @click="isOpen = true"
      v-text="install"
    />
    <PWAInstallModal
      v-show="isOpen"
      @can-install="canInstall = $event"
      @hint="hint"
      @toogle="isOpen = $event"
    />
  </div>
</template>

<script src="./PWAInstall" />

<style lang="stylus">
@require '~@mr-hope/vuepress-shared/styles/reset.styl'

.modal-button
  button()
  position fixed
  right 1rem
  bottom 1rem
  padding 0 16px
  border-radius 1.2rem
  background var(--accent-color, $accentColor)
  color var(--white, #fff)
  font-weight 600
  line-height 2.2rem
  outline none
  z-index 10

  @media (display-mode standalone)
    display none

  &:hover, &:active
    background var(--accent-color-l25, lighten($accentColor, 25%))
</style>
