<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-08 11:10:01
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-21 23:38:30
 * @Description: 侧边栏分组链接
 *
 * 添加了图标支持
-->
<template>
  <section
    :class="[
      {
        collapsable,
        'is-sub-group': depth !== 0
      },
      `depth-${depth}`
    ]"
    class="sidebar-group"
  >
    <router-link
      v-if="item.path"
      :class="{
        open,
        'active': isActive($route, item.path)
      }"
      class="sidebar-heading clickable"
      :to="item.path"
      @click.native="$emit('toggle')"
    >
      <i v-if="item.icon" :class="`iconfont ${$themeConfig.iconPrefix}${item.icon}`" />
      <span>{{ item.title }}</span>
      <span v-if="collapsable" :class="open ? 'down' : 'right'" class="arrow" />
    </router-link>

    <p v-else :class="{ open }" class="sidebar-heading" @click="$emit('toggle')">
      <i v-if="item.icon" :class="`iconfont ${$themeConfig.iconPrefix}${item.icon}`" />
      <span>{{ item.title }}</span>
      <span v-if="collapsable" :class="open ? 'down' : 'right'" class="arrow" />
    </p>

    <DropdownTransition>
      <SidebarLinks
        v-if="open || !collapsable"
        class="sidebar-group-items"
        :sidebar-depth="item.sidebarDepth"
        :depth="depth + 1"
        :items="item.children"
      />
    </DropdownTransition>
  </section>
</template>

<script>
import DropdownTransition from '@parent-theme/components/DropdownTransition.vue';
import { isActive } from '@parent-theme/util';

export default {
  name: 'SidebarGroup',
  components: { DropdownTransition },

  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    open: Boolean,
    collapsable: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    depth: Number
  },

  computed: {
    icon() {
      const themeConfig = this.$themeConfig;
      const { icon } = this.item;

      return themeConfig.sidebarIcon !== false && icon
        ? `${themeConfig.iconPrefix}${icon}`
        : '';
    }
  },

  // Ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  beforeCreate() {
    this.$options.components.SidebarLinks = require('@parent-theme/components/SidebarLinks.vue').default;
  },

  methods: { isActive }
};
</script>

<style lang="stylus">
.sidebar-group
  .sidebar-group
    padding-left 0.5em

  &:not(.collapsable)
    .sidebar-heading:not(.clickable)
      cursor auto
      color inherit

  // refine styles of nested sidebar groups
  &.is-sub-group
    padding-left 0

    & > .sidebar-heading
      font-size 0.95em
      line-height 1.4
      font-weight normal
      padding-left 2rem

      &:not(.clickable)
        opacity 0.8

    & > .sidebar-group-items
      padding-left 1rem

      & > li > .sidebar-link
        font-size 0.95em
        border-left none

  &.depth-2
    & > .sidebar-heading
      border-left none

.sidebar-heading
  color $textColor
  transition color 0.15s ease
  cursor pointer
  font-size 1.1em
  font-weight bold
  // text-transform uppercase
  padding 0.35rem 1.5rem 0.35rem 1.25rem
  width 100%
  box-sizing border-box
  margin 0
  border-left 0.25rem solid transparent

  &.open, &:hover
    color inherit

  .arrow
    position relative
    top -0.12em
    left 0.5em

  &.clickable
    &.active
      font-weight 600
      color $accentColor
      border-left-color $accentColor

    &:hover
      color $accentColor

.sidebar-group-items
  transition height 0.1s ease-out
  font-size 0.95em
  overflow hidden
</style>
