import { type App } from "@vuepress/core";
import { fs, path } from "@vuepress/utils";

import { getSearchIndex } from "./generateIndex.js";
import { type SearchProOptions } from "./options.js";
import { WORKER_FOLDER } from "./utils.js";

export const generateWorker = async (
  app: App,
  options: SearchProOptions
): Promise<void> => {
  const workerFilePath = app.dir.dest(options.worker || "search-pro.worker.js");
  const searchIndexContent = JSON.stringify(getSearchIndex(app, options));
  const workerPath = `${WORKER_FOLDER}original.js`;

  const workerFileContent = await fs.readFile(workerPath, "utf8");

  await fs.ensureDir(path.dirname(workerFilePath));
  await fs.writeFile(
    workerFilePath,
    workerFileContent.replace(
      "SEARCH_PRO_INDEX",
      `${JSON.stringify(searchIndexContent)}`
    )
  );
};
