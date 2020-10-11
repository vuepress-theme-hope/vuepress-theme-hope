<template>
  <span
    v-if="categoryName"
    class="category-info"
    :class="{ active }"
    :role="active ? 'navigation' : ''"
    :aria-label="hint"
    data-balloon-pos="down"
    @click="navigate"
  >
    <CategoryIcon />
    <span v-text="categoryName" />
  </span>
</template>

<script src="./CategoryInfo" />

<style lang="stylus">
.category-info.active > span:hover
  cursor pointer
  color var(--accent-color, $accentColor)
</style>
