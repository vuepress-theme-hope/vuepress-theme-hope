export interface ScrollPromise {
  wait(): Promise<void> | null;
  pending: () => void;
  resolve: () => void;
}

let promise: Promise<void> | null = null;
let promiseResolve: (() => void) | null = null;

export const scrollPromise: ScrollPromise = {
  wait: () => promise,
  pending: () => {
    promise = new Promise((resolve) => {
      promiseResolve = resolve;
    });
  },
  resolve: () => {
    promiseResolve?.();
    promise = null;
    promiseResolve = null;
  },
};
