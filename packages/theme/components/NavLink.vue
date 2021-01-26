<template>
  <RouterLink
    v-if="isInternal"
    class="nav-link"
    :class="{ active }"
    :to="link"
    @focusout="focusoutAction"
  >
    <i v-if="item.icon" :class="`iconfont ${iconPrefix}${item.icon}`" />
    {{ item.text }}
  </RouterLink>
  <a
    v-else
    class="nav-link external"
    :href="link"
    :target="target"
    :rel="rel"
    @focusout="focusoutAction"
  >
    <i v-if="item.icon" :class="`iconfont ${iconPrefix}${item.icon}`" />
    {{ item.text }}
    <OutboundLink v-if="isBlankTarget" />
  </a>
</template>

<script src="./NavLink" />

<style lang="stylus">
.nav-link
  line-height 1.4rem
  color var(--dark-grey)

  @media (max-width $MQMobile)
    color var(--text-color)

    &:hover, &.active
      color var(--accent-color)

  &.active
    color var(--accent-color)
</style>
