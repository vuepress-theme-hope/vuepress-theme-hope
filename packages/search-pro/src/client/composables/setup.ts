import { type InjectionKey, type Ref, provide, ref } from "vue";

export const searchModalSymbol: InjectionKey<Ref<boolean>> =
  Symbol.for("search-pro");

export const setupSearchModal = (): void => {
  const isActive = ref(false);

  provide(searchModalSymbol, isActive);
};
