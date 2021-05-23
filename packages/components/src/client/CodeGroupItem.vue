<template>
  <div class="code-group-item" :class="{ active }" :aria-selected="active">
    <slot />
  </div>
</template>

<script src="./CodeGroupItem" />

<style lang="stylus">
.code-group-item
  display none

  &.active
    display block

  div[class*='language-']
    border-top-left-radius 0
    border-top-right-radius 0
</style>
