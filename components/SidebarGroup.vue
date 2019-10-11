<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-08 11:10:01
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-12 00:16:23
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
      :class="{
        open,
        'active': isActive($route, item.path)
      }"
      :to="item.path"
      @click.native="$emit('toggle')"
      class="sidebar-heading clickable"
      v-if="item.path"
    >
      <i :class="`iconfont ${$themeConfig.iconPrefix}${item.icon}`" v-if="item.icon" />
      <span>{{ item.title }}</span>
      <span :class="open ? 'down' : 'right'" class="arrow" v-if="collapsable" />
    </router-link>

    <p :class="{ open }" @click="$emit('toggle')" class="sidebar-heading" v-else>
      <i :class="`iconfont ${$themeConfig.iconPrefix}${item.icon}`" v-if="item.icon" />
      <span>{{ item.title }}</span>
      <span :class="open ? 'down' : 'right'" class="arrow" v-if="collapsable" />
    </p>

    <DropdownTransition>
      <SidebarLinks
        :depth="depth + 1"
        :items="item.children"
        :sidebarDepth="item.sidebarDepth"
        class="sidebar-group-items"
        v-if="open || !collapsable"
      />
    </DropdownTransition>
  </section>
</template>

<script>
import { isActive } from '@parent-theme/util';
import DropdownTransition from '@parent-theme/components/DropdownTransition.vue';

export default {
  name: 'SidebarGroup',
  props: ['item', 'open', 'collapsable', 'depth'],
  components: { DropdownTransition },

  computed: {
    icon() {
      const themeConfig = this.$themeConfig;
      const icon = this.item.icon;

      return themeConfig.sidebarIcon !== false && icon ? `${themeConfig.iconPrefix}${icon}` : '';
    }
  },
  methods: { isActive },

  // Ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  beforeCreate() {
    this.$options.components.SidebarLinks = require('@parent-theme/components/SidebarLinks.vue').default;
  }
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
