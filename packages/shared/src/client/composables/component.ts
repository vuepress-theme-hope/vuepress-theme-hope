import { capitalize, camelize, getCurrentInstance } from "vue";
import type { App } from "vue";

export const hasGlobalComponent = (name: string, app?: App): boolean => {
  const instance = app ? app._instance : getCurrentInstance();

  return (
    typeof instance?.appContext.components === "object" &&
    (name in instance.appContext.components ||
      camelize(name) in instance.appContext.components ||
      capitalize(camelize(name)) in instance.appContext.components)
  );
};
