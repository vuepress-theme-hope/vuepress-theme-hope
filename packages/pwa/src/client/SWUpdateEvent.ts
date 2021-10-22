export default class SWUpdateEvent {
  constructor(private registration: ServiceWorkerRegistration) {}

  /** Check if the new service worker exists or not. */
  update(): Promise<void> {
    return this.registration.update();
  }

  /**
   * Activate new service worker to work 'location.reload()' with new data.
   */
  skipWaiting(): Promise<void> {
    const worker = this.registration.waiting;

    if (!worker) return Promise.resolve();

    console.log("[PWA]: Execute worker.skipWaiting().");

    return new Promise((resolve, reject) => {
      const channel = new MessageChannel();

      channel.port1.onmessage = (event): void => {
        console.log("[PWA]: Finish worker.skipWaiting().");
        if ((event.data as { error: Error | null }).error)
          reject((event.data as { error: Error | null }).error);
        else resolve(event.data as void);
      };

      worker.postMessage({ type: "skip-waiting" }, [channel.port2]);
    });
  }
}
