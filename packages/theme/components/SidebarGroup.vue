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
