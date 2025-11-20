import type { Code } from "../utils/index.js";
import { loadScript } from "../utils/index.js";

export type ScriptLoadState = Record<string, Promise<void>>;

const state: ScriptLoadState = {};

export const loadReact = async (code: Code): Promise<void> => {
  await Promise.all([
    loadScript(state, code.babel),
    loadScript(state, code.react),
    loadScript(state, code.reactDOM),
  ]);
};

export const loadVue = async (code: Code): Promise<void> => {
  const promises = [loadScript(state, code.vue)];

  if (code.useBabel) promises.push(loadScript(state, code.babel));

  await Promise.all(promises);
};

export const loadNormal = (code: Code): Promise<void> =>
  code.useBabel ? loadScript(state, code.babel) : Promise.resolve();
