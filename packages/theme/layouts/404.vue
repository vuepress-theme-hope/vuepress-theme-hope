<template>
  <Common :sidebar="false">
    <main class="page not-found">
      <h1>404</h1>
      <blockquote v-text="msg" />
      <div class="action-button" @click="back">{{ i18n.back }}</div>
      <RouterLink class="action-button" to="/">{{ i18n.home }}</RouterLink>
    </main>
  </Common>
</template>

<script src="./404" />

<style lang="stylus">
.not-found
  display block
  max-width $homePageWidth
  margin 0px auto
  padding ($navbarHeight + 1rem) 2rem 0 !important

  .action-button
    display inline-block
    font-size 1rem
    color var(--white)
    background-color var(--accent-color)
    margin 0 0.25rem
    padding 0.5rem 1rem
    border-radius 0.25rem
    transition background-color 0.1s ease
    box-sizing border-box
    border-bottom 1px solid var(--accent-color-d10)

    &:hover
      cursor pointer
      background-color var(--accent-color-l10)
</style>
