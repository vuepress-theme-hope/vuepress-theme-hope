<script setup lang="ts">
import { computed } from "vue";
import { usePageFrontmatter } from "vuepress/client";
import type { ThemeBlogHomePageFrontmatter } from "vuepress-theme-hope/client";
import BingHeroBackground from "vuepress-theme-hope/presets/BingHeroBackground.js";
import HitokotoBlogHero from "vuepress-theme-hope/presets/HitokotoBlogHero.js";

import MarkdownContent from "@theme-hope/components/MarkdownContent";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import ArticleList from "@theme-hope/modules/blog/components/ArticleList";
import BlogHero from "@theme-hope/modules/blog/components/BlogHero";
import BlogWrapper from "@theme-hope/modules/blog/components/BlogWrapper";
import InfoPanel from "@theme-hope/modules/blog/components/InfoPanel";
import ProjectPanel from "@theme-hope/modules/blog/components/ProjectPanel";
import { useArticles } from "@theme-hope/modules/blog/composables/index";

import "vuepress-theme-hope/modules/blog/styles/home.scss";

const articles = useArticles();
const frontmatter = usePageFrontmatter<ThemeBlogHomePageFrontmatter>();
const projects = computed(() => frontmatter.value.projects ?? []);
</script>

<template>
  <BlogWrapper>
    <div class="vp-blog vp-page">
      <BlogHero>
        <template #heroInfo="heroInfo">
          <HitokotoBlogHero v-bind="heroInfo" />
        </template>

        <template #heroBg>
          <BingHeroBackground />
        </template>
      </BlogHero>

      <div class="blog-page-wrapper custom">
        <main id="main-content" class="vp-blog-home">
          <DropTransition appear :delay="0.16">
            <ProjectPanel :items="projects" />
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
