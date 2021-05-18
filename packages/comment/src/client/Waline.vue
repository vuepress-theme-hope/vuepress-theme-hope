<template>
  <div v-show="commentDisplay" class="waline-wrapper">
    <div id="waline-comment" />
  </div>
</template>

<script src="./Waline" />

<style lang="stylus">
@require '~@mr-hope/vuepress-shared/styles/wrapper'

.page
  .waline-wrapper
    @extend $wrapper
    --waline-accent-color var(--accent-color)
    --waline-text-color var(--text-color)
    --waline-active-color var(--accent-color-l10)
    --waline-border none
    --waline-box-shadow 0 12px 40px rgba(134, 151, 168, 0.25)

    .theme-dark &
      --waline-active-color var(--accent-color-d10)
      --waline-box-shadow 0 12px 40px #0f0e0d
</style>
