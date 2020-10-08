<template>
  <div v-if="mediaLink" class="media-links-wrapper">
    <a
      v-for="link in links"
      :key="link.name"
      class="media-link"
      :href="link.url"
      target="_blank"
    >
      <Component :is="link.icon" />
    </a>
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