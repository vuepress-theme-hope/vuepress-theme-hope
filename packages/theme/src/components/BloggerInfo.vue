<template>
  <div class="blogger-info">
    <img v-if="bloggerAvatar" class="blogger-avatar" alt="blogger-avatar" :src="bloggerAvatar" />
    <h3 v-if="blogger" class="name" v-text="blogger " />
    <div class="num">
      <div>
        <h3>{{articleNum}}</h3>
        <h6>文章</h6>
      </div>
      <div>
        <h3>{{$tag.list.length}}</h3>
        <h6>标签</h6>
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
<style lang="stylus" scoped>
.blogger-info
  .blogger-avatar
    display block
    margin 2rem auto
    width 8rem
    height 8rem
    border-radius 50%

  .name
    text-align center

  .num
    display flex
    margin 0 auto 1rem
    width 80%

    > div
      text-align center
      flex auto

      &:first-child
        border-right 1px solid #333

      h3
        line-height auto
        margin 0 0 0.6rem

      h6
        line-height auto
        margin 0
</style>