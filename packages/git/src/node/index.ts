import { checkGitRepo } from "./check";
import { getContributors } from "./contributor";
import {
  defaultTransformer,
  getCreatedTimeStamp,
  getUpdatedTimeStamp,
} from "./time";

import type { Plugin } from "@mr-hope/vuepress-types";
import type { GitOptions } from "../types";

const gitPlugin: Plugin<GitOptions> = (options, { cwd }) => {
  const isGitRepoValid = checkGitRepo(cwd);

  return {
    name: "git",

    async extendPageData(page): Promise<void> {
      if (isGitRepoValid && page._filePath) {
        const { transformer } = options;
        const { $lang } = page._computed;

        const createTimeStamp = await getCreatedTimeStamp(page._filePath);
        const updateTimeStamp = await getUpdatedTimeStamp(page._filePath);

        if (updateTimeStamp) {
          const updatedTime =
            typeof transformer === "function"
              ? transformer(updateTimeStamp, $lang)
              : defaultTransformer(updateTimeStamp, $lang, options.timezone);

          page.updateTime = updatedTime;
          page.updateTimeStamp = updateTimeStamp;
        }

        if (createTimeStamp) {
          const createTime =
            typeof transformer === "function"
              ? transformer(createTimeStamp, $lang)
              : defaultTransformer(createTimeStamp, $lang, options.timezone);

          page.createTime = createTime;
          page.createTimeStamp = createTimeStamp;
        }

        if (options.contributor !== false)
          page.contributors = await getContributors(page._filePath);
      }
    },
  };
};

export = gitPlugin;
