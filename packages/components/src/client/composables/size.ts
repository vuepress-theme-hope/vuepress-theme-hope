import { useEventListener } from "@vueuse/core";
import { computed, onMounted, ref, unref } from "vue";
import type { Ref } from "vue";

const getValue = (value: string | number) =>
  typeof value === "string" ? value : `${value}px`;

export interface SizeOptions {
  width: string | number | undefined;
  height: string | number | undefined;
  ratio: number | undefined;
}

export interface SizeInfo<E extends HTMLElement> {
  el: Ref<E | undefined>;
  width: Ref<string>;
  height: Ref<string>;
}

export const useSize = <E extends HTMLElement>(
  options: SizeOptions
): SizeInfo<E> => {
  const el = ref<E>();
  const width = computed(() => getValue(unref(options.width) || "100%"));
  const height = ref("auto");

  const getHeight = (width: number): string => {
    const height = unref(options.height);
    const ratio = unref(options.ratio) || 16 / 9;

    return height ? getValue(height) : `${Number(width) / ratio}px`;
  };

  onMounted(() => {
    height.value = getHeight(el.value!.clientWidth);

    useEventListener("orientationchange", () => {
      height.value = getHeight(el.value!.clientWidth);
    });
    useEventListener("resize", () => {
      height.value = getHeight(el.value!.clientWidth);
    });
  });

  return {
    el,
    width,
    height,
  };
};
