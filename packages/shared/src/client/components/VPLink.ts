import {
  type ComputedRef,
  type Ref,
  type SlotsType,
  type VNode,
  computed,
  defineComponent,
  h,
  toRef,
  unref,
} from "vue";
import {
  type NavigationFailure,
  type RouteLocation,
  useRoute,
  useRouter,
} from "vue-router";

const guardEvent = (event: MouseEvent): boolean | void => {
  // don't redirect with control keys
  if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return;
  // don't redirect when preventDefault called
  if (event.defaultPrevented) return;
  // don't redirect on right click
  if (event.button !== undefined && event.button !== 0) return;
  // don't redirect if `target="_blank"`
  if (event.currentTarget) {
    const target = (<HTMLElement>event.currentTarget).getAttribute("target");

    if (target?.match(/\b_blank\b/i)) return;
  }

  event.preventDefault();

  return true;
};

export interface LinkOptions {
  route: ComputedRef<RouteLocation & { href: string }>;
  href: Ref<string>;
  isActive: Ref<boolean>;
  navigate: (event?: MouseEvent) => Promise<void | NavigationFailure>;
}

export const useLink = (link: string | Ref<string>): LinkOptions => {
  const router = useRouter();
  const currentRoute = useRoute();

  const route = computed(() => router.resolve(unref(link)));

  const isActive = computed<boolean>(
    () => route.value.path === currentRoute.path
  );

  const navigate = (
    event: MouseEvent = {} as MouseEvent
  ): Promise<void | NavigationFailure> =>
    guardEvent(event) ? router.push(unref(link)).catch() : Promise.resolve();

  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    navigate,
  };
};

export const VPLink = defineComponent({
  name: "VPLink",

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
        slots.default?.(linkOptions)
      );
  },
});
