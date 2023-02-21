import { type App } from "@vuepress/core";
import { fs, path } from "@vuepress/utils";
import { utoa } from "vuepress-shared/node";

import { getSearchIndex } from "./generateIndex.js";
import { type SearchProOptions } from "./options.js";
import { WORKER_PATH } from "./utils.js";

export const generateWorker = async (
  app: App,
  options: SearchProOptions
): Promise<void> => {
  const workerFilePath = app.dir.dest(options.worker || "search-pro.worker.js");
  const workerFileContent = await fs.readFile(WORKER_PATH, "utf8");

  await fs.ensureDir(path.dirname(workerFilePath));
  await fs.writeFile(
    workerFilePath,
    workerFileContent.replace(
      "SEARCH_PRO_INDEX",
      `"${utoa(JSON.stringify(getSearchIndex(app, options)))}"`
    )
  );
};
