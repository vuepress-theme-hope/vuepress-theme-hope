import { type Emitter } from "mitt";
import { type InjectionKey, inject } from "vue";

export type PWAEvent = Emitter<{
  ready: ServiceWorkerRegistration;
  registered: ServiceWorkerRegistration;
  cached: ServiceWorkerRegistration;
  updatefound: ServiceWorkerRegistration;
  updated: ServiceWorkerRegistration;
  offline: void;
  error: Error;
}>;

export const pwaEventSymbol: InjectionKey<PWAEvent> = Symbol.for("PWAEvent");

export const usePWAEvent = (): PWAEvent => {
  const pwaEvent = inject(pwaEventSymbol);

  if (!pwaEvent) throw new Error("usePWAEvent() is called without provider.");

  return pwaEvent;
};
