<template>
  <div v-if="mediaLink" class="media-links-wrapper">
    <div
      v-for="link in links"
      :key="link.name"
      class="media-link"
      @click="navigate(link.url, $router, $route)"
    >
      <Component :is="link.icon" />
    </div>
  </div>
</template>

<script src="./MediaLinks" />

<style lang="stylus">
.media-links-wrapper
  display flex
  justify-content center
  margin 8px auto

  .media-link
    width 28px
    height 28px
    margin 4px
    transform scale(1, 1)
    transition all 0.2s

    &:hover
      cursor pointer
      transform scale(1.2, 1.2)

    .icon
      width 100%
      height 100%
</style>