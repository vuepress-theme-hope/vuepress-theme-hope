<template>
  <div class="blogger-info">
    <img v-if="bloggerAvatar" class="blogger-avatar" alt="blogger-avatar" :src="bloggerAvatar" />
    <h3 v-if="blogger" class="name" v-text="blogger " />
    <div class="num-wrapper">
      <div>
        <div class="num">{{articleNum}}</div>
        <div>文章</div>
      </div>
      <div>
        <div class="num">{{$tag.list.length}}</div>
        <div>标签</div>
      </div>
    </div>
    <hr />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { PageComputed } from 'vuepress-types';

@Component
export default class BloggerInfo extends Vue {
  @Prop(Number)
  /** 文章数量 */
  private readonly articleNum!: number;

  /** 博主 */
  private get blogger() {
    return (
      this.$themeConfig.author || this.$page.frontmatter.blogger ||
      this.$page.frontmatter.author || this.$site.title || ''
    );
  }

  /** 博主头像 */
  private get bloggerAvatar() {
    return this.$themeConfig.bloggerAvatar || this.$themeConfig.logo || '';
  }
}
</script>
<style lang="stylus">
.blogger-info
  .blogger-avatar
    display block
    margin 2rem auto 0
    width 8rem
    height 8rem
    border-radius 50%

  .name
    text-align center

  .num-wrapper
    display flex
    margin 0 auto 1rem
    width 80%

    > div
      text-align center
      flex auto
      font-size 14px

      &:first-child
        border-right 1px solid #333

      .num
        line-height 1.5
        font-weight 600
        font-size 20px
</style>
