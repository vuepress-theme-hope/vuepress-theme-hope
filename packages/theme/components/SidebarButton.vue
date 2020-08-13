<template>
  <div class="sidebar-button" @click="$emit('toggle-sidebar')">
    <span class="icon" />
  </div>
</template>

<style lang="stylus">
.sidebar-button
  cursor pointer
  display none
  position absolute
  padding 0.6rem
  top 0.6rem
  left 1rem
  width 20px
  height 20px
  transition transform 0.2s ease-in-out
  vertical-align middle
  border 0 none
  background transparent

  &::before
    content ' '
    margin-top 0.125em

  &::after
    content ' '
    margin-bottom 0.125em

  .icon
    margin 0.2em 0

  &::before, &::after, .icon
    display block
    width 100%
    height 0.2em
    transition transform 0.2s ease-in-out
    border-radius 0.05em
    background var(--text-color)

.sidebar-open .sidebar-button
  &::before
    transform translateY(0.4em) rotate(135deg)

  .icon
    transform scale(0)

  &::after
    transform translateY(-0.4em) rotate(-135deg)

@media (max-width $MQMobile)
  .sidebar-button
    display block
</style>
