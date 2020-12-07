<template>
  <Common :sidebar="false">
    <main class="page not-found">
      <h1>404</h1>
      <blockquote v-text="msg" />
      <button class="action-button" @click="back">{{ i18n.back }}</button>
      <RouterLink class="action-button" to="/">{{ i18n.home }}</RouterLink>
    </main>
  </Common>
</template>

<script src="./404" />

<style lang="stylus">
.page.not-found
  display block
  max-width $homePageWidth
  margin 0px auto
  padding ($navbarHeight + 1rem) 2rem

  .action-button
    display inline-block
    box-sizing border-box
    margin 0 0.25rem
    padding 0.5rem 1rem
    border-bottom 1px solid var(--accent-color-d10)
    border-radius 0.25rem
    background var(--accent-color)
    color var(--white)
    font-size 1rem
    outline none
    transition background 0.1s ease

    &:hover
      cursor pointer
      background var(--accent-color-l10)
</style>
