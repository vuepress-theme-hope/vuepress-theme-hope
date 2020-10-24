<template>
  <div id="pwa-install">
    <button
      v-if="showInstall || isIOS"
      class="modal-button"
      @click="isOpen = true"
    >
      <slot>{{ install }}</slot>
    </button>
    <PWAInstallModal
      v-show="isOpen"
      @can-install="canInstall = $evnet"
      @toogle="isOpen = $event"
    />
  </div>
</template>

<script src="./PWAInstall" />

<style lang="stylus">
.modal-button
  position fixed
  right 2rem
  bottom 1rem
  border-radius 1.2rem
  padding 0 16px
  border none
  background var(--accent-color)
  color var(--white, #fff)
  line-height 2.4rem
  cursor pointer
  outline none

  &:hover, &:active
    background-color var(--accent-color-l25, lighten($accentColor, 25%))
</style>
