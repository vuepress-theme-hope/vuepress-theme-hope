import {
  computedAsync,
  debouncedWatch,
  onKeyStroke,
  useEventListener,
  useLocalStorage,
  useScrollLock,
  useSessionStorage,
} from "@vueuse/core";
import Mark from "mark.js/src/vanilla.js";
import MiniSearch, { type SearchResult } from "minisearch";
import {
  computed,
  createApp,
  defineComponent,
  markRaw,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
  watchEffect,
  type Ref,
  VNode,
} from "vue";
import { useRouter } from "vitepress";

import searchIndex from "@temp/minisearch/index";

import "../styles/search-modal.scss";

export default defineComponent({
  name: "SearchModal",

  emits: ["close"],

  setup() {
    const el = shallowRef<HTMLElement>();
    const resultsEl = shallowRef<HTMLElement>();
    const body = shallowRef<HTMLElement>();

    return (): VNode => h("div");
  },
});
