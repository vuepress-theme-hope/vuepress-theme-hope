import type { App } from "vuepress/core";
import { fs, path } from "vuepress/utils";

import type { SearchProOptions } from "./options.js";
import { WORKER_FILE } from "./utils.js";
import type { SearchIndexStore } from "../shared/index.js";

export const generateWorker = async (
  app: App,
  options: SearchProOptions,
  searchStore: SearchIndexStore,
): Promise<void> => {
  const workerFilePath = app.dir.dest(options.worker || "search-pro.worker.js");
  const searchIndexContent = JSON.stringify(searchStore);

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
