<template>
  <main aria-labelledby="main-title" class="home">
    <header class="hero">
      <img
        v-if="$frontmatter.heroImage"
        :class="{ light: Boolean($frontmatter.darkHeroImage) }"
        :src="$withBase($frontmatter.heroImage)"
        :alt="$frontmatter.heroAlt || 'HomeLogo'"
      />
      <img
        v-if="$frontmatter.darkHeroImage"
        class="dark"
        :src="$withBase($frontmatter.darkHeroImage)"
        :alt="$frontmatter.heroAlt || 'HomeLogo'"
      />
      <h1
        v-if="$frontmatter.heroText !== false"
        id="main-title"
        v-text="$frontmatter.heroText || $title || 'Hello'"
      />

      <p
        class="description"
        v-text="$frontmatter.tagline || $description || 'Welcome to your VuePress site'"
      />

      <p v-if="$frontmatter.action" class="action">
        <NavLink
          v-for="action in actionLinks"
          :key="action.text"
          :item="action"
          class="action-button"
        />
      </p>
    </header>

    <div v-if="$frontmatter.features && $frontmatter.features.length" class="features">
      <div
        v-for="(feature, index) in $frontmatter.features"
        :key="index"
        :class="{link:feature.link}"
        class="feature"
      >
        <h2>
          <span v-if="feature.link" @click="navigate(feature.link)">{{ feature.title }}</span>
          <span v-else>{{ feature.title }}</span>
        </h2>
        <p>{{ feature.details }}</p>
      </div>
    </div>

    <Content class="theme-default-content custom" />

    <PageFooter />
  </main>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import NavLink from '@theme/components/NavLink.vue';
import PageFooter from '@theme/components/PageFooter.vue';
import navigate from '@theme/util/navigate';

@Component({ components: { NavLink, PageFooter } })
export default class Home extends Vue {
  private get actionLinks() {
    const { action } = this.$frontmatter;
    if (Array.isArray(action)) return action;
    return [action];
  }

  private navigate(link: string) {
    navigate(link, this.$router, this.$route);
  }
}
</script>

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width $homePageWidth
  margin 0px auto
  display block

  @media (max-width: $MQMobileNarrow)
    padding-left 1.5rem
    padding-right 1.5rem

  .hero
    text-align center

    img
      display block
      max-width 100%
      max-height 280px
      margin 3rem auto 1.5rem

      @media (max-width: $MQMobileNarrow)
        max-height 210px
        margin 2rem auto 1.2rem

      .theme-light &
        &.light
          display block

        &.dark
          display none

      .theme-dark &
        &.light
          display none

        &.dark
          display block

    h1
      font-size 3rem

      @media (max-width: $MQMobileNarrow)
        font-size 2rem

    h1, .description, .action
      margin 1.8rem auto

      @media (max-width: $MQMobileNarrow)
        margin 1.2rem auto

    .description
      max-width 35rem
      font-size 1.6rem
      line-height 1.3
      color var(--text-color-l40)

      @media (max-width: $MQMobileNarrow)
        font-size 1.2rem

    .action-button
      display inline-block
      font-size 1.2rem
      color var(--white)
      background-color var(--accent-color)
      padding 0.8rem 1.6rem
      margin 0 0.8rem
      border-radius 4px
      transition background-color 0.1s ease
      box-sizing border-box
      border-bottom 1px solid var(--accent-color-d10)

      @media (max-width: $MQMobileNarrow)
        padding 0.6rem 1.2rem
        font-size 1rem

      &:hover
        background-color var(--accent-color-l10)

  .features
    display flex
    flex-wrap wrap
    justify-content space-between
    align-items flex-start
    align-content stretch
    padding 1.2rem 0
    margin-top 2.5rem
    border-top 1px solid $borderColor

    @media (max-width: $MQMobile)
      flex-direction column
      align-items stretch

    .feature
      flex-basis calc(33% - 5rem)
      transition all 0.5s
      padding 0 2.5rem

      &.link
        cursor pointer

      &:hover
        transform scale(1.05)
        box-shadow 0 2px 12px 0 var(--card-shadow-color)

      &.link h2:hover
        color var(--accent-color)

      h2
        font-size 1.4rem
        font-weight 500
        border-bottom none
        padding-bottom 0
        color var(--text-color-l10)

        @media (max-width: $MQMobileNarrow)
          font-size 1.25rem

      p
        color var(--text-color-l25)
</style>
