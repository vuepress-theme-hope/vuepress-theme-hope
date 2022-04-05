import { capitalize, camelize, getCurrentInstance } from "vue";

export const isComponentRegistered = (name: string): boolean => {
  const instance = getCurrentInstance();

  return (
    typeof instance?.appContext.components === "object" &&
    (name in instance.appContext.components ||
      camelize(name) in instance.appContext.components ||
      capitalize(camelize(name)) in instance.appContext.components)
  );
};
