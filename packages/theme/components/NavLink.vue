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
