import { isPlainObject } from "@vuepress/shared";
import type { App } from "vue";
import { camelize, capitalize, getCurrentInstance } from "vue";

export const hasGlobalComponent = (name: string, app?: App): boolean => {
  const instance = app ? app._instance : getCurrentInstance();

  return (
    isPlainObject(instance?.appContext.components) &&
    (name in instance!.appContext.components ||
      camelize(name) in instance!.appContext.components ||
      capitalize(camelize(name)) in instance!.appContext.components)
  );
};
