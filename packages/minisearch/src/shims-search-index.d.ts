declare module "@temp/minisearch/database" {
  import { type ShallowRef } from "vue";

  export const searchIndex: ShallowRef<
    Record<string, () => Promise<{ default: string }>>
  >;
}
