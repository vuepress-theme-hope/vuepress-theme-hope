<template>
  <span
    v-if="categoryName"
    class="category-info"
    :class="{ active }"
    :title="hint"
    :role="active ? 'navigation' : ''"
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
