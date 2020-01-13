export default class SWUpdateEvent {
  registration: any;

  constructor(registration: any) {
    Object.defineProperty(this, 'registration', {
      value: registration,
      configurable: true,
      writable: true
    });
  }

  /** Check if the new service worker exists or not. */
  update(): void {
    return this.registration.update();
  }

  /**
   * Activate new service worker to work 'location.reload()' with new data.
   */
  skipWaiting(): Promise<void> {
    const worker = this.registration.waiting;

    if (!worker) return Promise.resolve();

    console.log('[PWA]: 执行 worker.skipWaiting().');

    return new Promise((resolve, reject) => {
      const channel = new MessageChannel();

      channel.port1.onmessage = (event): void => {
        console.log('[PWA]: 完成 worker.skipWaiting().');
        if (event.data.error) reject(event.data.error);
        else resolve(event.data);
      };

      worker.postMessage({ type: 'skip-waiting' }, [channel.port2]);
    });
  }
}
