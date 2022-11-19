import { provide, ref } from "vue";
import { InjectionKey, Ref } from "vue";

export const searchModalSymbol: InjectionKey<Ref<boolean>> =
  Symbol.for("search-pro");

export const setupSearchModal = (): void => {
  const isActive = ref(false);

  provide(searchModalSymbol, isActive);
};
