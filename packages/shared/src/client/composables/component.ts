import type { App } from "vue";
import { camelize, capitalize, getCurrentInstance } from "vue";

export const hasGlobalComponent = (name: string, app?: App): boolean => {
  const globalComponents = (app?._instance || getCurrentInstance())?.appContext
    .components;

  if (!globalComponents) return false;

  return (
    name in globalComponents ||
    camelize(name) in globalComponents ||
    capitalize(camelize(name)) in globalComponents
  );
};
