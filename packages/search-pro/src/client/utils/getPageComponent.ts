import { type ComponentOptions } from "vue";

import { pagesComponents } from "@internal/pagesComponents";

export const getPageComponent = (id: string): ComponentOptions => {
  try {
    return pagesComponents[id.split("#")[0]];
  } catch (err) {
    console.error(err);

    return { render: () => null };
  }
};
