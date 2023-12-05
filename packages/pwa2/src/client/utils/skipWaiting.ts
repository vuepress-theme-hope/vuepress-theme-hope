/**
 * Call `skipWaiting()` inside current waiting worker
 *
 * 在当前等待中的 Service Worker 中调用 `skipWaiting()`
 */
export const skipWaiting = (registration: ServiceWorkerRegistration): void => {
  // get the waiting worker
  const worker = registration.waiting;

  // if there is no waiting worker, return directly
  if (!worker) return;

  // post SKIP_WAITING message to the waiting worker
  const channel = new MessageChannel();

  worker.postMessage({ type: "SKIP_WAITING" }, [channel.port2]);
};
