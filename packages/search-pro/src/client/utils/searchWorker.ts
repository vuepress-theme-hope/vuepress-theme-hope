import { searchProOptions } from "../define.js";
import { type SearchOptions, type SearchResult } from "../typings/index.js";

declare const __VUEPRESS_BASE__: string;
declare const __VUEPRESS_DEV__: boolean;

export interface SearchWorker {
  search: (
    query: string,
    locale: string,
    searchOptions?: SearchOptions
  ) => Promise<SearchResult[]>;
  terminate: () => void;
}

export const createSearchWorker = (): SearchWorker => {
  // service worker with module only works on webkit browsers now, so we only used it in dev
  const worker = new Worker(
    __VUEPRESS_DEV__
      ? new URL("../worker/index.js", import.meta.url)
      : `${__VUEPRESS_BASE__}${searchProOptions.worker}`,
    __VUEPRESS_DEV__ ? { type: "module" } : {}
  );
  const queue: {
    resolve: (results: SearchResult[]) => void;
    reject: (err: Error) => void;
  }[] = [];

  worker.addEventListener(
    "message",
    ({ data }: MessageEvent<SearchResult[]>) => {
      const { resolve } = queue.shift()!;

      resolve(data);
    }
  );

  return {
    search: (query, locale, searchOptions): Promise<SearchResult[]> =>
      new Promise((resolve, reject) => {
        worker.postMessage({
          query,
          locale,
          options: searchOptions,
        });
        queue.push({ resolve, reject });
      }),
    terminate: (): void => {
      worker.terminate();
      queue.forEach(({ reject }) =>
        reject(new Error("Worker has been terminated."))
      );
    },
  };
};
