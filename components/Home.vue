<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-13 13:59:35
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-13 15:04:20
 * @Description: 主页
-->
<template>
  <main aria-labelledby="main-title" class="home">
    <header class="hero">
      <img :alt="data.heroAlt || 'HomeLogo'" :src="$withBase(data.heroImage)" v-if="data.heroImage" />

      <h1 id="main-title" v-if="data.heroText !== null">{{ data.heroText || $title || 'Hello' }}</h1>

      <p class="description">{{ data.tagline || $description || 'Welcome to your VuePress site' }}</p>

      <p class="action" v-if="data.actionText && data.actionLink">
        <NavLink :item="actionLink" class="action-button" />
      </p>
    </header>

    <div class="features" v-if="data.features && data.features.length">
      <div
        :class="{link:feature.link}"
        :key="index"
        class="feature"
        v-for="(feature, index) in data.features"
      >
        <h2>
          <span @click="navigate(feature.link)" v-if="feature.link">{{ feature.title }}</span>
          <span v-else>{{ feature.title }}</span>
        </h2>
        <p>{{ feature.details }}</p>
      </div>
    </div>

    <Content class="theme-default-content custom" />

    <div class="footer" v-if="data.footer">{{ data.footer }}</div>
  </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue';
import navigate from '../lib/navigate';

export default {
  components: { NavLink },

  computed: {
    data() {
      return this.$page.frontmatter;
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      };
    }
  },

  methods: {
    navigate(link) {
      navigate(link, this.$router, this.$route);
    }
  }
};
</script>

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width 960px
  margin 0px auto
  display block

  .hero
    text-align center

    img
      max-width 100%
      max-height 280px
      display block
      margin 3rem auto 1.5rem

    h1
      font-size 3rem

    h1, .description, .action
      margin 1.8rem auto

    .description
      max-width 35rem
      font-size 1.6rem
      line-height 1.3
      color lighten($textColor, 40%)

    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color $accentColor
      padding 0.8rem 1.6rem
      border-radius 4px
      transition background-color 0.1s ease
      box-sizing border-box
      border-bottom 1px solid darken($accentColor, 10%)

      &:hover
        background-color lighten($accentColor, 10%)

  .features
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between

  .feature
    width calc(1 / 3 - 5rem)
    padding 0 1.5%
    transition all 0.5s
    flex-grow 1
    flex-basis 30%
    max-width 30%

    &.link
      cursor pointer

    &:hover
      transform scale(1.05)
      box-shadow 1px 1px 6px 0 rgba(32, 33, 36, 0.28)

    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)

    &.link h2:hover
      color $accentColor

    p
      color lighten($textColor, 25%)

  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)

@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column

    .feature
      align-items stretch
      width calc(100% - 5rem)
      max-width calc(100% - 5rem)
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem

    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem

      h1
        font-size 2rem

      h1, .description, .action
        margin 1.2rem auto

      .description
        font-size 1.2rem

      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem

    .feature
      h2
        font-size 1.25rem
</style>
