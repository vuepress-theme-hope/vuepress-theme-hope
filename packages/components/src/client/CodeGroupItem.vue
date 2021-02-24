<template>
  <div class="code-group-item" :class="{ active }">
    <slot />
  </div>
</template>

<script src="./CodeGroupItem" />

<style lang="stylus">
.code-group-item
  display none

  &.active
    display block
</style>
