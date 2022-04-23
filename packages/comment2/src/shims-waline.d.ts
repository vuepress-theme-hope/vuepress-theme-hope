declare module "@waline/client/dist/component" {
  import type { ComponentOptions } from "vue";

  export const Waline: ComponentOptions;

  export const version: string;
}

declare module "@Waline" {
  import type { ComponentOptions } from "vue";

  const component: ComponentOptions;

  export default component;
}
