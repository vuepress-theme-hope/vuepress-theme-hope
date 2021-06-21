<template>
  <main class="home" :aria-labelledby="heroText ? 'main-title' : undefined">
    <header class="hero">
      <DropTransition type="group">
        <img
          v-if="heroImage"
          key="light"
          :class="{ light: Boolean(darkHeroImage) }"
          :src="heroImage"
          :alt="heroAlt"
        />
        <img
          v-if="darkHeroImage"
          key="dark"
          class="dark"
          :src="darkHeroImage"
          :alt="heroAlt"
        />
      </DropTransition>

      <div class="hero-info">
        <DropTransition v-if="heroText" :delay="0.04">
          <h1 id="main-title" v-text="heroText" />
        </DropTransition>
        <DropTransition v-if="tagline" :delay="0.08">
          <p class="description" v-text="tagline" />
        </DropTransition>
        <DropTransition :delay="0.12">
          <p v-if="actions.length" class="actions">
            <NavLink
              v-for="action in actions"
              :key="action.text"
              class="action-button"
              :class="action.type"
              :item="action"
            />
          </p>
        </DropTransition>
      </div>
    </header>

    <DropTransition :delay="0.16">
      <div v-if="features.length" class="features">
        <template
          v-for="(feature, index) in $frontmatter.features"
          :key="feature.title"
        >
          <RouterLink
            v-if="feature.link"
            :to="feature.link"
            class="feature link"
            :class="{ [`feature${(index % 9) + 1}`]: !isPure }"
            role="navigation"
          >
            <h2>{{ feature.title }}</h2>
            <p>{{ feature.details }}</p>
          </RouterLink>
          <div v-else class="feature" :class="`feature${(index % 9) + 1}`">
            <h2>{{ feature.title }}</h2>
            <p>{{ feature.details }}</p>
          </div>
        </template>
      </div>
    </DropTransition>

    <DropTransition :delay="0.24">
      <div class="theme-default-content custom">
        <Content />
      </div>
    </DropTransition>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { usePure } from "@mr-hope/vuepress-shared/client";
import {
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from "@vuepress/client";
import { isArray } from "@vuepress/shared";
import DropTransition from "./transitions/DropTransition.vue";
import NavLink from "./NavLink";

import type { HopeThemeHomePageFrontmatter } from "../../shared";

interface ActionConfig {
  text: string;
  link: string;
  type?: "primary" | "secondary";
}

interface HomePageFrontmatter extends HopeThemeHomePageFrontmatter {
  home: true;
  heroImage?: string;
  darkHeroImage?: string;
  heroAlt?: string;
  heroText?: string;
  tagline?: string;
  actions?: ActionConfig[];
  features?: {
    title: string;
    details: string;
  }[];
}

export default defineComponent({
  name: "Home",

  components: {
    DropTransition,
    NavLink,
  },

  setup() {
    const frontmatter = usePageFrontmatter<HomePageFrontmatter>();
    const siteLocale = useSiteLocaleData();
    const isPure = usePure();

    const heroImage = computed(() => {
      if (!frontmatter.value.heroImage) return null;

      return withBase(frontmatter.value.heroImage);
    });

    const darkHeroImage = computed(() => {
      if (!frontmatter.value.darkHeroImage) return null;

      return withBase(frontmatter.value.darkHeroImage);
    });

    const heroText = computed(() => {
      if (frontmatter.value.heroText === null) return null;

      return frontmatter.value.heroText || siteLocale.value.title || "Hello";
    });

    const heroAlt = computed(
      () => frontmatter.value.heroAlt || heroText.value || "hero"
    );

    const tagline = computed(() => {
      if (frontmatter.value.tagline === null) return null;

      return (
        frontmatter.value.tagline ||
        siteLocale.value.description ||
        "Welcome to your VuePress site"
      );
    });

    const actions = computed(() => {
      if (!isArray(frontmatter.value.actions)) return [];

      return frontmatter.value.actions.map(
        ({ text, link, type = "primary" }) => ({
          text,
          link,
          type,
        })
      );
    });

    const features = computed(() => {
      if (isArray(frontmatter.value.features))
        return frontmatter.value.features;

      return [];
    });

    return {
      darkHeroImage,
      heroImage,
      heroAlt,
      heroText,
      tagline,
      actions,
      features,
      isPure,
    };
  },
});
</script>
