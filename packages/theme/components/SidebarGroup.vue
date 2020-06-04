<template>
  <section
    :class="[
      {
        collapsable: item.collapsable,
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
      <i v-if="item.icon" :class="`iconfont ${getIcon(item.icon)}`" />
      <span>{{ item.title }}</span>
      <span v-if="item.collapsable" :class="open ? 'down' : 'right'" class="arrow" />
    </router-link>

    <p
      v-else
      :class="{ clickable: item.collapsable, open }"
      class="sidebar-heading"
      @click="$emit('toggle')"
    >
      <i v-if="item.icon" :class="`iconfont ${getIcon(item.icon)}`" />
      <span>{{ item.title }}</span>
      <span v-if="item.collapsable" :class="open ? 'down' : 'right'" class="arrow" />
    </p>

    <DropdownTransition>
      <SidebarLinks
        v-if="open || !item.collapsable"
        class="sidebar-group-items"
        :sidebar-depth="item.sidebarDepth"
        :depth="depth + 1"
        :items="item.children"
      />
    </DropdownTransition>
  </section>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { SidebarAutoItem, SidebarGroupItem } from "../util/sidebar";
import DropdownTransition from "@theme/components/DropdownTransition.vue";
import { isActive } from "../util/path";

@Component({ components: { DropdownTransition } })
export default class SidebarGroup extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  private readonly item!: SidebarAutoItem | SidebarGroupItem;

  @Prop(Boolean)
  private readonly open!: boolean;

  @Prop(Number)
  private readonly depth!: number;

  private isActive = isActive;

  private getIcon(icon: string | undefined) {
    const { iconPrefix } = this.$themeConfig;

    return this.$themeConfig.sidebarIcon !== false && icon
      ? `${iconPrefix === "" ? "" : iconPrefix || "icon-"}${icon}`
      : "";
  }

  private beforeCreate() {
    this.$options.components!.SidebarLinks = require("@theme/components/SidebarLinks.vue").default;
  }
}
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
  color var(--text-color)
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
  user-select none

  &.open, &:hover
    color inherit

  .arrow
    position relative
    top -0.12em
    left 0.5em

  &.clickable
    &.active
      font-weight 600
      color var(--accent-color)
      border-left-color var(--accent-color)

    &:hover
      color var(--accent-color)

.sidebar-group-items
  transition height 0.1s ease-out
  font-size 0.95em
  overflow hidden
</style>
