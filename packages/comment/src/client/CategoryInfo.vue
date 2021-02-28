<template>
  <span
    v-if="categoryName"
    class="category-info"
    :class="{ enable: canUse }"
    :role="canUse ? 'navigation' : ''"
    :aria-label="hint"
    data-balloon-pos="down"
    @click="navigate"
  >
    <CategoryIcon />
    <span property="articleSection" v-text="categoryName" />
  </span>
</template>

<script src="./CategoryInfo" />

<style lang="stylus">
.category-info.enable > span:hover
  cursor pointer
  color var(--accent-color, $accentColor)
</style>
