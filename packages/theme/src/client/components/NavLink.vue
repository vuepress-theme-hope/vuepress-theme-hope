<template>
  <RouterLink
    v-if="isRouterLink"
    class="nav-link"
    :class="{ active: isActive }"
    :to="item.link"
    :aria-label="linkAriaLabel"
    v-bind="$attrs"
    @focusout="focusoutAction"
  >
    <slot name="before">
      <i v-if="item.icon" :class="`iconfont ${iconPrefix}${item.icon}`" />
    </slot>
    {{ item.text }}
    <slot name="after" />
  </RouterLink>
  <a
    v-else
    class="nav-link external"
    :href="item.link"
    :rel="linkRel"
    :target="linkTarget"
    :aria-label="linkAriaLabel"
    v-bind="$attrs"
    @focusout="focusoutAction"
  >
    <slot name="before">
      <i v-if="item.icon" :class="`iconfont ${iconPrefix}${item.icon}`" />
      {{ item.text }}</slot
    >
    <OutboundLink v-if="isBlankTarget" />
    <slot name="after" />
  </a>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";
import { useRoute } from "vue-router";
import { useSiteData } from "@vuepress/client";
import { useIconPrefix } from "@mr-hope/vuepress-shared/client";
import { isLinkHttp, isLinkMailto, isLinkTel } from "@vuepress/shared";

import type { PropType } from "vue";
import type { NavLink } from "../../shared";

export default defineComponent({
  name: "NavLink",

  inheritAttrs: false,

  props: {
    item: {
      type: Object as PropType<NavLink>,
      required: true,
    },
  },

  emits: ["focusout"],

  setup(props, { emit }) {
    const route = useRoute();
    const site = useSiteData();
    const iconPrefix = useIconPrefix();

    const { item } = toRefs(props);

    // if the link has http protocol
    const hasHttpProtocol = computed(() => isLinkHttp(item.value.link));

    // if the link has non-http protocol
    const hasNonHttpProtocal = computed(
      () => isLinkMailto(item.value.link) || isLinkTel(item.value.link)
    );

    // resolve the `target` attr
    const linkTarget = computed(() =>
      hasNonHttpProtocal.value
        ? undefined
        : item.value.target
        ? item.value.target
        : hasHttpProtocol.value
        ? "_blank"
        : undefined
    );

    // if the `target` attr is '_blank'
    const isBlankTarget = computed(() => linkTarget.value === "_blank");

    // is `<RouterLink>` or not
    const isRouterLink = computed(
      () =>
        !hasHttpProtocol.value &&
        !hasNonHttpProtocal.value &&
        !isBlankTarget.value
    );

    // resolve the `rel` attr
    const linkRel = computed(() =>
      hasNonHttpProtocal.value
        ? undefined
        : item.value.rel
        ? item.value.rel
        : isBlankTarget.value
        ? "noopener noreferrer"
        : undefined
    );

    // resolve the `aria-label` attr
    const linkAriaLabel = computed(
      () => item.value.ariaLabel || item.value.text
    );

    // should be active when current route is a subpath of this link
    const shouldBeActiveInSubpath = computed(() => {
      const localeKeys = Object.keys(site.value.locales);
      if (localeKeys.length) {
        return !localeKeys.some((key) => key === item.value.link);
      }
      return item.value.link !== "/";
    });

    // if this link is active in subpath
    const isActive = computed(() => {
      if (!isRouterLink.value || !shouldBeActiveInSubpath.value) {
        return false;
      }
      return route.path.startsWith(item.value.link);
    });

    const focusoutAction = (): void => emit("focusout");

    return {
      isActive,
      iconPrefix,
      isBlankTarget,
      isRouterLink,
      linkRel,
      linkTarget,
      linkAriaLabel,

      focusoutAction,
    };
  },
});
</script>
