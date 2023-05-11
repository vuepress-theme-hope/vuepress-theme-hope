import { useSiteData } from "@vuepress/client";
import { ExternalLinkIcon } from "@vuepress/plugin-external-link-icon/client";
import { isLinkHttp, isLinkMailto, isLinkTel } from "@vuepress/shared";
import {
  type PropType,
  type SlotsType,
  type VNode,
  computed,
  defineComponent,
  h,
  toRef,
} from "vue";
import { RouterLink, useRoute } from "vue-router";
import { keys, startsWith } from "vuepress-shared/client";

import HopeIcon from "@theme-hope/components/HopeIcon";

import { type AutoLinkOptions } from "../../shared/index.js";

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
    before?: () => VNode[] | VNode;
    after?: () => VNode[] | VNode;
    default?: () => VNode[] | VNode;
  }>,

  setup(props, { attrs, emit, slots }) {
    const route = useRoute();
    const siteData = useSiteData();

    const config = toRef(props, "config");

    // if the link has http protocol
    const hasHttpProtocol = computed(() => isLinkHttp(config.value.link));

    // if the link has non-http protocol
    const hasNonHttpProtocol = computed(
      () => isLinkMailto(config.value.link) || isLinkTel(config.value.link)
    );

    // resolve the `target` attr
    const linkTarget = computed(() =>
      hasNonHttpProtocol.value
        ? undefined
        : config.value.target || (hasHttpProtocol.value ? "_blank" : undefined)
    );

    // if the `target` attr is "_blank"
    const isBlankTarget = computed(() => linkTarget.value === "_blank");

    // render `<RouterLink>` or not
    const renderRouterLink = computed(
      () =>
        !hasHttpProtocol.value &&
        !hasNonHttpProtocol.value &&
        !isBlankTarget.value
    );

    // resolve the `rel` attr
    const anchorRel = computed(() =>
      hasNonHttpProtocol.value
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

      const localeKeys = keys(siteData.value.locales);

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
          : startsWith(route.path, config.value.link)
        : false
    );

    return (): VNode => {
      const { before, after, default: defaultSlot } = slots;
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
              defaultSlot
                ? defaultSlot()
                : [before ? before() : h(HopeIcon, { icon }), text, after?.()]
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
            defaultSlot
              ? defaultSlot()
              : [
                  before ? before() : h(HopeIcon, { icon }),
                  text,
                  props.noExternalLinkIcon ? null : h(ExternalLinkIcon),
                  after?.(),
                ]
          );
    };
  },
});
