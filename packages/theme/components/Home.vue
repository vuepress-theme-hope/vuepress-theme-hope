<template>
  <main
    :aria-labelledby="$frontmatter.heroText !== null ? 'main-title' : null"
    class="home"
  >
    <header class="hero">
      <MyTransition>
        <img
          v-if="$frontmatter.heroImage"
          key="light"
          :class="{ light: Boolean($frontmatter.darkHeroImage) }"
          :src="$withBase($frontmatter.heroImage)"
          :alt="$frontmatter.heroAlt || 'HomeLogo'"
        />
        <img
          v-if="$frontmatter.darkHeroImage"
          key="dark"
          class="dark"
          :src="$withBase($frontmatter.darkHeroImage)"
          :alt="$frontmatter.heroAlt || 'HomeLogo'"
        />
      </MyTransition>
      <div class="hero-info">
        <MyTransition :delay="0.04">
          <h1
            v-if="$frontmatter.heroText !== false"
            id="main-title"
            v-text="$frontmatter.heroText || $title || 'Hello'"
          />
        </MyTransition>
        <MyTransition :delay="0.08">
          <p
            class="description"
            v-text="
              $frontmatter.tagline ||
              $description ||
              'Welcome to your VuePress site'
            "
          />
        </MyTransition>
        <MyTransition :delay="0.12">
          <p v-if="$frontmatter.action" class="action">
            <NavLink
              v-for="action in actionLinks"
              :key="action.text"
              :item="action"
              class="action-button"
            />
          </p>
        </MyTransition>
      </div>
    </header>

    <MyTransition :delay="0.16">
      <div
        v-if="$frontmatter.features && $frontmatter.features.length"
        class="features"
      >
        <div
          v-for="(feature, index) in $frontmatter.features"
          :key="index"
          :class="{ link: feature.link }"
          class="feature"
          @click="feature.link ? navigate(feature.link) : ''"
        >
          <h2>{{ feature.title }}</h2>
          <p>{{ feature.details }}</p>
        </div>
      </div>
    </MyTransition>

    <MyTransition :delay="0.24">
      <Content class="theme-default-content custom" />
    </MyTransition>

    <MyTransition :delay="0.28">
      <PageFooter />
    </MyTransition>
  </main>
</template>

<script src="./Home" />

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width $homePageWidth
  margin 0px auto
  display block

  @media (max-width $MQMobileNarrow)
    padding-left 1.5rem
    padding-right 1.5rem

  .hero
    text-align center

    @media (min-width $MQNarrow)
      display flex
      justify-content space-evenly
      align-items center
      text-align left

    img
      display block
      max-width 100%
      max-height 280px
      margin 3rem auto 1.5rem

      @media (max-width $MQMobileNarrow)
        max-height 210px
        margin 2rem auto 1.2rem

      @media (min-width $MQNarrow)
        max-height 320px
        margin 0

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

      @media (max-width $MQMobileNarrow)
        font-size 2rem

    h1, .description, .action
      margin 1.8rem auto

      @media (max-width $MQMobileNarrow)
        margin 1.2rem auto

    .description
      max-width 35rem
      font-size 1.6rem
      line-height 1.3
      color var(--text-color-l40)

      @media (max-width $MQMobileNarrow)
        font-size 1.2rem

    .action-button
      display inline-block
      font-size 1.2rem
      color var(--white)
      background-color var(--accent-color)
      padding 0.8rem 1.6rem
      margin 0.6rem 0.8rem
      border-radius 0.25rem
      transition background-color 0.1s ease
      border-bottom 1px solid var(--accent-color-d10)
      overflow hidden

      @media (max-width $MQMobileNarrow)
        padding 0.6rem 1.2rem
        font-size 1rem

      &:hover
        background-color var(--accent-color-l10)

  .features
    display flex
    flex-wrap wrap
    justify-content space-between
    align-items stretch
    align-content stretch
    padding 1.2rem 0
    margin 0 -2rem
    border-top 1px solid $borderColor

    @media (max-width $MQMobile)
      flex-direction column
      align-items stretch

    @media (max-width $MQMobileNarrow)
      margin 0 -1.5rem

    .feature
      display flex
      flex-direction column
      justify-content center
      flex-basis calc(33% - 5rem)
      transition all 0.5s
      padding 0 1.5rem
      margin 0 1rem
      border-radius 1rem
      overflow hidden

      @media (max-width $MQNarrow)
        flex-basis calc(50% - 5rem)

      &.link
        cursor pointer

      &:hover
        transform scale(1.05)
        box-shadow 0 2px 12px 0 var(--card-shadow-color)

      h2
        font-size 1.25rem
        font-weight 500
        border-bottom none
        margin-bottom 0
        color var(--text-color-l10)

        @media (max-width $MQMobileNarrow)
          font-size 1.25rem

      p
        margin-top 0
        color var(--text-color-l25)
        text-align justify
</style>
