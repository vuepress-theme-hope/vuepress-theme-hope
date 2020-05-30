<template>
  <div class="blogger-info-wrapper">
    <div class="blogger-info">
      <div class="blogger-wrapper">
        <div class="blogger" :class="{ hasIntro }" @click="jumpIntro">
          <img
            v-if="bloggerAvatar"
            class="avatar"
            alt="blogger-avatar"
            :src="$withBase(bloggerAvatar)"
          />
          <div v-if="bloggerName" class="name" v-text="bloggerName " />
        </div>
        <MediaLinks class="logo-media-link" />
      </div>
      <div class="num-wrapper">
        <div @click="navigate('/article/', $router, $route)">
          <div>{{i18n.article}}</div>
          <div class="num">{{$articles.length}}</div>
        </div>
        <div @click="navigate('/category/', $router, $route)">
          <div>{{i18n.category}}</div>
          <div class="num">{{$category.list.length}}</div>
        </div>
        <div @click="navigate('/tag/', $router, $route)">
          <div>{{i18n.tag}}</div>
          <div class="num">{{$tag.list.length}}</div>
        </div>
      </div>
    </div>
    <MediaLinks class="bottom-media-link" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Vue } from "vue-property-decorator";
import {
  HopeLangI18nConfig,
  deepAssign,
  i18n,
} from "@mr-hope/vuepress-shared-utils";
import { ArticleMixin } from "../util/articleMixin";
import MediaLinks from "@theme/components/MediaLinks.vue";
import { PageComputed } from "@mr-hope/vuepress-types";
import navigate from "../util/navigate";

@Component({ components: { MediaLinks } })
export default class BloggerInfo extends Mixins(ArticleMixin) {
  private navigate = navigate;

  private get blogConfig() {
    return this.$themeConfig.blog || {};
  }

  private get bloggerName(): string {
    return (
      this.blogConfig.name || this.$themeConfig.author || this.$site.title || ""
    );
  }

  private get bloggerAvatar(): string {
    return this.blogConfig.avatar || this.$themeConfig.logo || "";
  }

  private get hasIntro(): boolean {
    return Boolean(this.blogConfig.intro);
  }

  private get i18n(): HopeLangI18nConfig["blog"] {
    return this.$themeLocaleConfig.blog || i18n.getDefaultLocale().blog;
  }

  private jumpIntro() {
    if (this.hasIntro)
      navigate(this.blogConfig.intro as string, this.$router, this.$route);
  }
}
</script>

<style lang="stylus">
.blogger-info-wrapper
  .blogger-info
    @media (min-width: $MQNormal)
      display flex

    .logo-media-link
      display none

      @media (min-width: $MQNormal)
        display flex

      @media (min-width: $MQWide)
        display none

      // do not display in sidebar
      .sidebar &
        display none

    .blogger-wrapper
      padding 8px 0
      text-align center

      .blogger
        display inline-block
        padding 0 32px

        &.hasIntro
          cursor pointer

        .name
          margin 16px auto
          font-size 22px

          @media (min-width: $MQNormal)
            font-size 24px

        .avatar
          display block
          width 128px
          height 128px
          border-radius 50%

    .num-wrapper
      display flex
      margin 8px auto
      width 80%

      @media (min-width: $MQNormal)
        width 100%
        flex-direction column-reverse
        justify-content space-evenly

      > div
        text-align center
        flex auto
        font-size 14px
        cursor pointer

        @media (min-width: $MQNormal)
          display flex
          flex-direction row-reverse
          justify-content space-evenly
          align-items center

          .num
            margin-right 10px

        &:hover
          color var(--accent-color)

        .num
          position relative
          line-height 1.5
          font-weight 600
          font-size 20px

  .bottom-media-link
    display none

    @media (min-width: $MQWide)
      display flex
</style>
