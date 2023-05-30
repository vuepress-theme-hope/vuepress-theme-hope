import { type Ref, computed, ref, watch } from "vue";

export interface ArrayCycle<T> {
  index: Ref<number>;
  item: Ref<T>;
  prev: () => void;
  next: () => void;
}

export const useArrayCycle = <T>(
  target: Ref<T[]>,
  preserveIndexWhenChange = false
): ArrayCycle<T> => {
  const index = ref(0);
  const item = computed(() => target.value[index.value]);

  const prev = (): void => {
    index.value = index.value > 0 ? index.value - 1 : target.value.length - 1;
  };

  const next = (): void => {
    index.value = index.value < target.value.length - 1 ? index.value + 1 : 0;
  };

  watch(target, () => {
    if (!preserveIndexWhenChange) index.value = 0;
  });

  return {
    index,
    item,
    prev,
    next,
  };
};
