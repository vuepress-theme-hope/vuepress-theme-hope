import type { App } from "@vuepress/core";
import { removeLeadingSlash } from "@vuepress/shared";
import { fs } from "@vuepress/utils";

import type { RemovePWAOptions } from "./options.js";

const serviceWorkerContent =
  'self.addEventListener("install",(()=>self.skipWaiting())),self.addEventListener("activate",(()=>{const e=[prefix,"precache-v2","undefined"!=typeof registration?registration.scope:""].filter((e=>e&&e.length>0)).join("-");self.caches.open(e).then((e=>e.keys())).then((e=>e.forEach((e=>cache.delete(e))))).then((()=>{self.clients.claim().then((()=>{})).then((()=>self.registration.unregister())).then((()=>self.clients.matchAll())).then((e=>e.forEach((e=>e.navigate(e.url)))))}))}));';

const getEmptyServiceWorker = (prefix: string): string =>
  `const prefix = \`${prefix}\`;${serviceWorkerContent}`;

export const generateEmptyServiceWorker = (
  app: App,
  {
    cachePrefix = "workbox",
    swLocation = "service-worker.js",
  }: RemovePWAOptions,
): Promise<void> =>
  fs.writeFile(
    app.dir.dest(removeLeadingSlash(swLocation)),
    getEmptyServiceWorker(cachePrefix),
    "utf-8",
  );
