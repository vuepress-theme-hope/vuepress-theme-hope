<template>
  <div class="blog-hero">
    <div v-if="$frontmatter.hero !== false" class="hero" :style="{ ...bgImageStyle }">
      <div
        class="mask"
        :style="{
          background: `url(${
            $frontmatter.bgImage? $withBase($frontmatter.bgImage): require('../assets/homeImage.jpg')
          }) center/cover no-repeat`
        }"
      />
      <MyTransition :delay="0.04">
        <img
          v-if="$frontmatter.heroImage"
          class="hero-logo"
          :style="heroImageStyle || {}"
          :src="$withBase($frontmatter.heroImage)"
          alt="hero"
        />
      </MyTransition>
      <MyTransition :delay="0.08">
        <h1 v-if="$frontmatter.showTitle !== false">{{ $frontmatter.heroText || $title || 'Hope' }}</h1>
      </MyTransition>

      <MyTransition :delay="0.12">
        <p v-if="$description" class="description" v-text="$description" />
      </MyTransition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MyTransition from "@theme/components/MyTransition.vue";

@Component({ components: { MyTransition } })
export default class BlogHero extends Vue {
  private get heroImageStyle() {
    const defaultStyle = {
      maxHeight: "180px",
      margin:
        this.$frontmatter.showTitle === false ? "6rem auto 1.5rem" : "1rem auto",
    };

    return { ...defaultStyle, ...this.$frontmatter.heroImageStyle };
  }

  private get bgImageStyle() {
    const defaultBgImageStyle = {
      height: "350px",
      textAlign: "center",
      overflow: "hidden",
    };
    const { bgImageStyle = {} } = this.$frontmatter;

    return { ...defaultBgImageStyle, ...bgImageStyle };
  }
}
</script>
<style lang="stylus">
.blog-hero
  position relative
  color #fff

  @media (min-width: $MQMobile)
    margin 16px auto
    border-radius 8px
    overflow hidden

  @media (max-width: $MQMobile)
    height 450px
    margin 0 -1.5rem 16px

  @media (max-width: $MQNarrow)
    height 350px

  .mask
    position absolute
    top 0
    bottom 0
    left 0
    right 0

    &:after
      display block
      content ' '
      background var(--light-grey)
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      z-index 1
      opacity 0.2

  & > :not(.mask)
    position relative
    z-index 2

  h1
    margin 0.5rem auto
    font-size 36px

    @media (max-width: $MQNarrow)
      font-size 30px

    @media (max-width: $MQMobile)
      font-size 36px

    @media (max-width: $MQMobileNarrow)
      font-size 30px

  .hero-logo + h1
    margin 0 auto

  .description
    margin 1.2rem auto 0
    font-size 20px

    @media (max-width: $MQNarrow)
      font-size 18px

    @media (max-width: $MQMobile)
      font-size 20px

    @media (max-width: $MQMobileNarrow)
      font-size 18px
</style>
