import type { App } from "vuepress/core";
import { fs, path } from "vuepress/utils";

import { getSearchIndexStore } from "./generateIndex.js";
import type { SearchProOptions } from "./options.js";
import type { Store } from "./store.js";
import { WORKER_FILE } from "./utils.js";

export const generateWorker = async (
  app: App,
  options: SearchProOptions,
  store: Store,
): Promise<void> => {
  const workerFilePath = app.dir.dest(options.worker || "search-pro.worker.js");
  const searchIndexContent = JSON.stringify(
    await getSearchIndexStore(app, options, store),
  );

  const workerFileContent = await fs.readFile(WORKER_FILE, "utf8");

  await fs.ensureDir(path.dirname(workerFilePath));
  await fs.writeFile(
    workerFilePath,
    workerFileContent
      .replace(
        "SEARCH_PRO_INDEX",
        () => `${JSON.stringify(searchIndexContent)}`,
      )
      .replace(
        "SEARCH_PRO_SORT_STRATEGY",
        JSON.stringify(options.sortStrategy || "max"),
      ),
  );
};
