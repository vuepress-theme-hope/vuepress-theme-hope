<script setup lang="ts">
import HopeLogo from "docs-shared/components/HopeLogo.js";
import { Blog } from "vuepress-theme-hope/blog";
import BingHeroBackground from "vuepress-theme-hope/presets/BingHeroBackground.js";
import HitokotoBlogHero from "vuepress-theme-hope/presets/HitokotoBlogHero.js";
</script>

<template>
  <Blog>
    <template #heroLogo>
      <HopeLogo />
    </template>

    <template #heroInfo="info">
      <HitokotoBlogHero v-bind="info" />
    </template>

    <template #heroBg>
      <BingHeroBackground />
    </template>
  </Blog>
</template>
