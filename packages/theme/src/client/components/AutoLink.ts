import { computed, defineComponent, h, toRef } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useSiteData } from "@vuepress/client";
import { ExternalLinkIcon } from "@vuepress/plugin-external-link-icon/lib/client";
import { isLinkHttp, isLinkMailto, isLinkTel } from "@vuepress/shared";

import Icon from "@theme-hope/components/Icon";

import type { PropType, VNode } from "vue";
import type { AutoLink } from "../../shared";

export default defineComponent({
  name: "AutoLink",

  inheritAttrs: false,

  props: {
    config: {
      type: Object as PropType<AutoLink>,
      required: true,
    },
    exact: Boolean,
    externalLinkIcon: {
      type: Boolean,
      default: true,
    },
  },

  emits: ["focusout"],

  setup(props, { attrs, emit, slots }) {
    const route = useRoute();
    const site = useSiteData();

    const config = toRef(props, "config");

    // if the link has http protocol
    const hasHttpProtocol = computed(() => isLinkHttp(config.value.link));

    // if the link has non-http protocol
    const hasNonHttpProtocal = computed(
      () => isLinkMailto(config.value.link) || isLinkTel(config.value.link)
    );

    // resolve the `target` attr
    const linkTarget = computed(() =>
      hasNonHttpProtocal.value
        ? undefined
        : config.value.target || (hasHttpProtocol.value ? "_blank" : undefined)
    );

    // if the `target` attr is '_blank'
    const isBlankTarget = computed(() => linkTarget.value === "_blank");

    // render `<RouterLink>` or not
    const renderRouterLink = computed(
      () =>
        !hasHttpProtocol.value &&
        !hasNonHttpProtocal.value &&
        !isBlankTarget.value
    );

    // resolve the `rel` attr
    const anchorRel = computed(() =>
      hasNonHttpProtocal.value
        ? undefined
        : config.value.rel ||
          (isBlankTarget.value ? "noopener noreferrer" : undefined)
    );

    // resolve the `aria-label` attr
    const linkAriaLabel = computed(
      () => config.value.ariaLabel || config.value.text
    );

    // should be active when current route is a subpath of this link
    const shouldBeActiveInSubpath = computed(() => {
      // should not be active in `exact` mode
      if (props.exact) return false;

      const localeKeys = Object.keys(site.value.locales);

      return localeKeys.length
        ? // check all the locales
          localeKeys.every((key) => key !== config.value.link)
        : // check root
          config.value.link !== "/";
    });

    // if this link is active
    const isActive = computed(() =>
      renderRouterLink.value
        ? config.value.activeMatch
          ? new RegExp(config.value.activeMatch).test(route.path)
          : // if this link is active in subpath
          !shouldBeActiveInSubpath.value
          ? route.path === config.value.link
          : route.path.startsWith(config.value.link)
        : false
    );

    return (): VNode => {
      const { text, icon, link } = config.value;

      return renderRouterLink.value
        ? h(
            RouterLink,
            {
              to: link,
              "aria-label": linkAriaLabel.value,
              ...attrs,
              // class needs to be merged manually
              class: ["nav-link", { active: isActive.value }, attrs["class"]],
              onFocusout: () => emit("focusout"),
            },
            () =>
              slots["default"]?.() || [
                slots["before"]?.() || h(Icon, { icon }),
                text,
                slots["after"]?.(),
              ]
          )
        : h(
            "a",
            {
              href: link,
              rel: anchorRel.value,
              target: linkTarget.value,
              "aria-label": linkAriaLabel.value,
              ...attrs,
              // class needs to be merged manually
              class: ["nav-link", attrs["class"]],
              onFocusout: () => emit("focusout"),
            },
            slots["default"]?.() || [
              slots["before"]?.() || h(Icon, { icon }),
              text,
              props.externalLinkIcon ? h(ExternalLinkIcon) : null,
              slots["after"]?.(),
            ]
          );
    };
  },
});
