<script setup lang="ts">
import BingHeroBackground from "vuepress-theme-hope/presets/BingHeroBackground.js";
import HitokotoBlogHero from "vuepress-theme-hope/presets/HitokotoBlogHero.js";

import MarkdownContent from "@theme-hope/components/MarkdownContent";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import ArticleList from "@theme-hope/modules/blog/components/ArticleList";
import BlogHero from "@theme-hope/modules/blog/components/BlogHero";
import InfoPanel from "@theme-hope/modules/blog/components/InfoPanel";
import ProjectPanel from "@theme-hope/modules/blog/components/ProjectPanel";
import { useArticles } from "@theme-hope/modules/blog/composables/index";
import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper";

import "vuepress-theme-hope/modules/blog/styles/home.scss";

const articles = useArticles();
</script>

<template>
  <BlogWrapper>
    <div class="vp-page vp-blog">
      <BlogHero>
        <template #heroInfo="{ tagline, isFullScreen, ...heroInfo }">
          <HitokotoBlogHero v-bind="heroInfo" />
        </template>
        <template #heroBg>
          <BingHeroBackground />
        </template>
      </BlogHero>
      <div class="blog-page-wrapper custom">
        <main class="vp-blog-home" id="main-content">
          <DropTransition appear :delay="0.16">
            <ProjectPanel />
          </DropTransition>
          <DropTransition appear :delay="0.24">
            <ArticleList :items="articles.items" />
          </DropTransition>
        </main>
        <DropTransition appear :delay="0.16">
          <InfoPanel />
        </DropTransition>
      </div>
      <DropTransition appear :delay="0.28">
        <MarkdownContent />
      </DropTransition>
    </div>
  </BlogWrapper>
</template>

<style lang="scss">
.blog-page-wrapper.custom {
  direction: rtl;

  > * > * {
    direction: ltr;
  }
}
</style>
