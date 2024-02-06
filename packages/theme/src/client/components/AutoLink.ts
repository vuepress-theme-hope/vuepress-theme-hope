import {
  isLinkHttp,
  isLinkWithProtocol,
  keys,
  startsWith,
} from "@vuepress/helper/client";
import { ExternalLinkIcon } from "@vuepress/plugin-external-link-icon/client";
import type { PropType, SlotsType, VNode } from "vue";
import { computed, defineComponent, h, toRef } from "vue";
import { RouteLink, useRoute, useSiteData } from "vuepress/client";

import HopeIcon from "@theme-hope/components/HopeIcon";

import type { AutoLinkOptions } from "../../shared/index.js";

export default defineComponent({
  name: "AutoLink",

  inheritAttrs: false,

  props: {
    /**
     * @description Autolink config
     */
    config: {
      type: Object as PropType<AutoLinkOptions>,
      required: true,
    },

    /**
     * @description Whether it's active only when exact match
     */
    exact: Boolean,

    /**
     * @description Whether to hide externalLinkIcon
     */
    noExternalLinkIcon: Boolean,
  },

  emits: ["focusout"],

  slots: Object as SlotsType<{
    before?: () => VNode[] | VNode | null;
    after?: () => VNode[] | VNode | null;
    default?: () => VNode[] | VNode;
  }>,

  setup(props, { attrs, emit, slots }) {
    const route = useRoute();
    const siteData = useSiteData();

    const config = toRef(props, "config");

    // If the link has http protocol
    const isHttp = computed(() => isLinkHttp(config.value.link));

    // If the link has non-http protocol
    const withProtocol = computed(
      () => !isHttp.value && isLinkWithProtocol(config.value.link),
    );

    // Resolve the `target` attr
    const linkTarget = computed(
      () => config.value.target || (isHttp.value ? "_blank" : undefined),
    );

    // If the `target` attr is "_blank"
    const isBlankTarget = computed(() => linkTarget.value === "_blank");

    // Render `<RouteLink>` or not
    const renderRouteLink = computed(
      () => !isHttp.value && !withProtocol.value && !isBlankTarget.value,
    );

    // Resolve the `rel` attr
    const anchorRel = computed(
      () =>
        config.value.rel ||
        (isBlankTarget.value ? "noopener noreferrer" : null),
    );

    // Resolve the `aria-label` attr
    const linkAriaLabel = computed(
      () => config.value.ariaLabel || config.value.text,
    );

    // Should be active when current route is a subpath of this link
    const shouldBeActiveInSubpath = computed(() => {
      // Should not be active in `exact` mode
      if (props.exact) return false;

      const localeKeys = keys(siteData.value.locales);

      return localeKeys.length
        ? // Check all the locales
          localeKeys.every((key) => key !== config.value.link)
        : // Check root
          config.value.link !== "/";
    });

    // If this link is active
    const isActive = computed(() =>
      renderRouteLink.value
        ? config.value.activeMatch
          ? new RegExp(config.value.activeMatch, "u").test(route.path)
          : // If this link is active in subpath
            shouldBeActiveInSubpath.value
            ? startsWith(route.path, config.value.link)
            : route.path === config.value.link
        : false,
    );

    return (): VNode => {
      const { before, after, default: defaultSlot } = slots;
      const { text, icon, link } = config.value;

      return renderRouteLink.value
        ? h(
            RouteLink,
            {
              to: link,
              "aria-label": linkAriaLabel.value,
              ...attrs,
              // Class needs to be merged manually
              class: ["nav-link", { active: isActive.value }, attrs["class"]],
              onFocusout: () => emit("focusout"),
            },
            () =>
              defaultSlot
                ? defaultSlot()
                : [before ? before() : h(HopeIcon, { icon }), text, after?.()],
          )
        : h(
            "a",
            {
              href: link,
              rel: anchorRel.value,
              target: linkTarget.value,
              "aria-label": linkAriaLabel.value,
              ...attrs,
              // Class needs to be merged manually
              class: ["nav-link", attrs["class"]],
              onFocusout: () => emit("focusout"),
            },
            defaultSlot
              ? defaultSlot()
              : [
                  before ? before() : h(HopeIcon, { icon }),
                  text,
                  props.noExternalLinkIcon ? null : h(ExternalLinkIcon),
                  after?.(),
                ],
          );
    };
  },
});
