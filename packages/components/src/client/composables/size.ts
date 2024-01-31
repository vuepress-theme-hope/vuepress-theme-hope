import { isString } from "@vuepress/helper/client";
import type { MaybeRef } from "@vueuse/core";
import { useEventListener } from "@vueuse/core";
import type { Ref, ShallowRef } from "vue";
import { computed, isRef, onMounted, ref, shallowRef, unref, watch } from "vue";

const getValue = (value: string | number): string =>
  isString(value) ? value : `${value}px`;

export interface SizeOptions {
  width: string | number | undefined;
  height: string | number | undefined;
  ratio: string | number | undefined;
}

export interface SizeInfo<E extends HTMLElement> {
  el: ShallowRef<E | undefined>;
  width: Ref<string>;
  height: Ref<string>;
  resize: () => void;
}

export const useSize = <E extends HTMLElement>(
  options: SizeOptions,
  extraHeight: MaybeRef<number> = 0,
): SizeInfo<E> => {
  const el = shallowRef<E>();
  const width = computed(() => getValue(unref(options.width) || "100%"));
  const height = ref("auto");

  const getRadio = (ratio: number | string | undefined): number => {
    if (isString(ratio)) {
      const [width, height] = ratio.split(":");
      const parsedRadio = Number(width) / Number(height);

      if (!Number.isNaN(parsedRadio)) return parsedRadio;
    }

    return typeof ratio === "number" ? ratio : 16 / 9;
  };

  const getHeight = (width: number): string => {
    const height = unref(options.height);
    const ratio = getRadio(unref(options.ratio));

    return height
      ? getValue(height)
      : `${Number(width) / ratio + unref(extraHeight)}px`;
  };

  const updateHeight = (): void => {
    if (el.value) height.value = getHeight(el.value.clientWidth);
  };

  onMounted(() => {
    updateHeight();
    if (isRef(extraHeight)) watch(extraHeight, updateHeight);
    useEventListener("orientationchange", updateHeight);
    useEventListener("resize", updateHeight);
  });

  return {
    el,
    width,
    height,
    resize: updateHeight,
  };
};
