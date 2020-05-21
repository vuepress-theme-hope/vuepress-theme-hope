<template>
  <transition
    name="dropdown"
    @enter="setHeight"
    @after-enter="unsetHeight"
    @before-leave="setHeight"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DropdownTransition extends Vue {
  private setHeight(items: HTMLElement) {
    // explicitly set height so that it can be transitioned
    items.style.height = `${items.scrollHeight}px`;
  }

  private unsetHeight(items: HTMLElement) {
    items.style.height = "";
  }
}
</script>

<style lang="stylus">
.dropdown-enter, .dropdown-leave-to
  height 0 !important
</style>
