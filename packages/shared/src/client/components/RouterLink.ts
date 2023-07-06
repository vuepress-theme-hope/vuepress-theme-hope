import type { ComputedRef, Ref, SlotsType, VNode } from "vue";
import { computed, defineComponent, h, toRef, unref } from "vue";
import type { NavigationFailure, RouteLocation } from "vue-router";
import { useRoute, useRouter } from "vue-router";

import { guardEvent, resolveRouteWithRedirect } from "../utils/index.js";

export interface LinkOptions {
  route: ComputedRef<RouteLocation & { href: string }>;
  href: Ref<string>;
  isActive: Ref<boolean>;
  navigate: (event?: MouseEvent) => Promise<void | NavigationFailure>;
}

export const useLink = (link: string | Ref<string>): LinkOptions => {
  const router = useRouter();
  const currentRoute = useRoute();

  const route = computed(() => resolveRouteWithRedirect(router, unref(link)));

  const isActive = computed<boolean>(
    () => route.value.fullPath === currentRoute.fullPath,
  );

  const navigate = (
    event: MouseEvent = {} as MouseEvent,
  ): Promise<void | NavigationFailure> =>
    guardEvent(event) ? router.push(unref(link)).catch() : Promise.resolve();

  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    navigate,
  };
};

export const RouterLink = defineComponent({
  name: "RouterLink",

  props: {
    /**
     * Link
     */
    to: {
      type: String,
      required: true,
    },
  },

  slots: Object as SlotsType<{
    default: (linkOptions: LinkOptions) => VNode | VNode[];
  }>,

  setup(props, { slots }) {
    const to = toRef(props, "to");
    const linkOptions = useLink(to);

    return (): VNode =>
      h(
        "a",
        {
          class: ["vp-link", { "vp-active": linkOptions.isActive.value }],
          href: linkOptions.href.value,
          onClick: linkOptions.navigate,
        },
        slots.default?.(linkOptions),
      );
  },
});
