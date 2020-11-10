<template>
  <section
    :class="[
      {
        collapsable: item.collapsable,
        'is-sub-group': depth !== 0,
      },
      `depth-${depth}`,
    ]"
    class="sidebar-group"
  >
    <RouterLink
      v-if="item.path"
      :class="{
        open,
        active: isActive($route, item.path),
      }"
      class="sidebar-heading clickable"
      :to="item.path"
      @click="$emit('toggle')"
    >
      <i v-if="item.icon" :class="`iconfont ${getIcon(item.icon)}`" />
      <span>{{ item.title }}</span>
      <span
        v-if="item.collapsable"
        :class="open ? 'down' : 'right'"
        class="arrow"
      />
    </RouterLink>

    <p
      v-else
      :class="{ clickable: item.collapsable, open }"
      class="sidebar-heading"
      @click="$emit('toggle')"
    >
      <i v-if="item.icon" :class="`iconfont ${getIcon(item.icon)}`" />
      <span>{{ item.title }}</span>
      <span
        v-if="item.collapsable"
        :class="open ? 'down' : 'right'"
        class="arrow"
      />
    </p>

    <DropdownTransition>
      <SidebarLinks
        v-if="open || !item.collapsable"
        class="sidebar-group-items"
        :depth="depth + 1"
        :items="item.children"
      />
    </DropdownTransition>
  </section>
</template>

<script src="./SidebarGroup" />

<style lang="stylus">
.sidebar-group
  .sidebar-group
    padding-left 0.5em

  &:not(.collapsable)
    .sidebar-heading:not(.clickable)
      color inherit
      cursor auto

  // refine styles of nested sidebar groups
  &.is-sub-group
    padding-left 0

    & > .sidebar-heading
      padding-left 2rem
      font-size 0.95em
      font-weight normal
      line-height 1.4

      &:not(.clickable)
        opacity 0.8

    & > .sidebar-group-items
      padding-left 1rem

      & > li > .sidebar-link
        border-left none
        font-size 0.95em

  &.depth-2
    & > .sidebar-heading
      border-left none

.sidebar-heading
  box-sizing border-box
  width 100%
  margin 0
  padding 0.35rem 1.5rem 0.35rem 1.25rem
  border-left 0.25rem solid transparent
  color var(--text-color)
  font-size 1.1em
  font-weight bold
  cursor pointer
  transition color 0.15s ease
  user-select none

  &.open, &:hover
    color inherit

  .arrow
    position relative
    top -0.12em
    left 0.5em

  &.clickable
    &.active
      border-left-color var(--accent-color)
      color var(--accent-color)
      font-weight 600

    &:hover
      color var(--accent-color)

.sidebar-group-items
  font-size 0.95em
  transition height 0.1s ease-out
  overflow hidden
</style>
