import { useScrollLock } from "@vueuse/core";
import {
  Transition,
  defineComponent,
  h,
  ref,
  onBeforeUnmount,
  onMounted,
  watch,
} from "vue";
import { useRoute } from "vue-router";

import { useMobile } from "@theme-hope/composables";
import NavScreenLinks from "@theme-hope/module/navbar/components/NavScreenLinks";
import OutlookSettings from "@theme-hope/module/outlook/components/OutlookSettings";

import type { VNode } from "vue";

import "../styles/nav-screen.scss";

export default defineComponent({
  name: "NavScreen",

  props: {
    active: Boolean,
  },

  emits: ["close"],

  setup(props, { emit, slots }) {
    const route = useRoute();
    const isMobile = useMobile();

    const body = ref<HTMLElement | null>();
    const isLocked = useScrollLock(body);

    watch(isMobile, (value) => {
      if (!value && props.active) emit("close");
    });

    watch(
      () => route.path,
      () => {
        isLocked.value = false;
        emit("close");
      }
    );

    onMounted(() => {
      body.value = document.body;
    });

    onBeforeUnmount(() => {
      isLocked.value = false;
    });

    return (): VNode =>
      h(
        Transition,
        {
          name: "fade",
          onEnter: () => {
            isLocked.value = true;
          },
          onAfterLeave: () => {
            isLocked.value = false;
          },
        },
        () =>
          props.active
            ? h(
                "div",
                { id: "nav-screen" },
                h("div", { class: "container" }, [
                  slots["before"]?.(),
                  h(NavScreenLinks),
                  h("div", { class: "outlook-wrapper" }, h(OutlookSettings)),
                  slots["after"]?.(),
                ])
              )
            : null
      );
  },
});
