import { clientWorker, searchProOptions } from "../define.js";
import {
  type MessageData,
  type QueryResult,
  type SearchResult,
} from "../typings/index.js";

declare const __VUEPRESS_BASE__: string;
declare const __VUEPRESS_DEV__: boolean;

export interface SearchWorker {
  search: <T extends MessageData>(
    options: T
  ) => Promise<
    T["type"] extends "search"
      ? SearchResult[]
      : T["type"] extends "suggest"
      ? string[]
      : QueryResult
  >;
  terminate: () => void;
}

export const createSearchWorker = (): SearchWorker => {
  // service worker with module only works on webkit browsers now, so we only used it in dev
  const worker = new Worker(
    __VUEPRESS_DEV__
      ? clientWorker
      : `${__VUEPRESS_BASE__}${searchProOptions.worker}`,
    __VUEPRESS_DEV__ ? { type: "module" } : {}
  );
  const queue: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolve: (args: any) => void;
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
    search: <T extends MessageData>(
      options: T
    ): Promise<
      T["type"] extends "search"
        ? SearchResult[]
        : T["type"] extends "suggest"
        ? string[]
        : QueryResult
    > =>
      new Promise((resolve, reject) => {
        worker.postMessage(options);
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
