<template>
  <aside class="sidebar">
    <BloggerInfo v-if="sidebarDisplay !== 'none'" :class="{ mobile: sidebarDisplay === 'mobile' }" />

    <NavLinks />

    <slot name="top" />

    <SidebarLinks :depth="0" :items="items" />
    <slot name="bottom" />
  </aside>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import BloggerInfo from '@theme/components/BloggerInfo.vue';
import NavLinks from '@theme/components/NavLinks.vue';
import { SidebarItem } from '@theme/util/sidebar';
import SidebarLinks from '@theme/components/SidebarLinks.vue';

@Component({ components: { BloggerInfo, SidebarLinks, NavLinks } })
export default class Sidebar extends Vue {
  @Prop({ type: Array, required: true })
  private readonly items!: SidebarItem[];

  private get blogConfig() {
    return this.$themeConfig.blog || {};
  }

  private get sidebarDisplay() {
    return this.blogConfig.sidebarDisplay || 'none';
  }
}
</script>

<style lang="stylus">
.sidebar
  ul
    padding 0
    margin 0
    list-style-type none

  a
    display inline-block

  .blogger-info.mobile
    display none

  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0

    a
      font-weight 600

    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem

  & > .sidebar-links
    padding 1.5rem 0

    & > li > a.sidebar-link
      font-size 1.1em
      line-height 1.7
      font-weight bold

    & > li:not(:first-child)
      margin-top 0.75rem

@media (max-width: $MQMobile)
  .sidebar
    .blogger-info.mobile
      display block

    .nav-links
      display block

      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)

    & > .sidebar-links
      padding 1rem 0
</style>
