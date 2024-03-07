import { values } from "@vuepress/helper/client";
import type { SearchOptions } from "slimsearch";

import type { IndexItem } from "../../shared/index.js";
import { clientWorker, searchProOptions } from "../define.js";
import type { QueryResult, SearchResult } from "../typings/index.js";

declare const __VUEPRESS_BASE__: string;
declare const __VUEPRESS_DEV__: boolean;

interface PromiseItem {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (args: any) => void;
  reject: (err: Error) => void;
}

export interface SearchWorker {
  /**
   * Get both suggestions and results
   *
   * 同时获取建议和结果
   *
   * @param query - search query 搜素词
   * @param localePath - locale path 语言路径
   * @param options - search options 搜素选项
   */
  all: (
    query: string,
    localePath?: string,
    options?: SearchOptions<string, IndexItem>,
  ) => Promise<QueryResult>;

  /**
   * Get suggestions
   *
   * 获取建议
   *
   * @param query - search query 搜素词
   * @param localePath - locale path 语言路径
   * @param options - search options 搜素选项
   */
  suggest: (
    query: string,
    localePath?: string,
    options?: SearchOptions<string, IndexItem>,
  ) => Promise<string[]>;

  /**
   * Get search results
   *
   * 获取搜索结果
   *
   * @param query - search query 搜素词
   * @param localePath - locale path 语言路径
   * @param options - search options 搜素选项
   */
  search: (
    query: string,
    localePath?: string,
    options?: SearchOptions<string, IndexItem>,
  ) => Promise<SearchResult[]>;

  /**
   * Terminate current worker
   *
   * 终止当前 worker
   */
  terminate: () => void;
}

export const createSearchWorker = (): SearchWorker => {
  // Service worker with module only works on webkit browsers now, so we only used it in dev
  const worker = new Worker(
    __VUEPRESS_DEV__
      ? clientWorker
      : `${__VUEPRESS_BASE__}${searchProOptions.worker}`,
    __VUEPRESS_DEV__ ? { type: "module" } : {},
  );
  const queues = {
    suggest: [] as PromiseItem[],
    search: [] as PromiseItem[],
    all: [] as PromiseItem[],
  };

  worker.addEventListener(
    "message",
    ({
      data,
    }: MessageEvent<
      | ["suggest", number, string[]]
      | ["search", number, SearchResult[]]
      | ["all", number, QueryResult]
    >) => {
      const [type, timestamp, result] = data;
      const queue = queues[type];
      const index = queue.findIndex(({ id }) => id === timestamp);

      if (index > -1) {
        const { resolve } = queue[index];

        queue.forEach((item, i) => {
          if (i > index) item.reject(new Error("Search has been canceled."));
        });
        queues[type] = queue.slice(index + 1);
        resolve(result);
      }
    },
  );

  return {
    suggest: (
      query: string,
      locale?: string,
      options?: SearchOptions<string, IndexItem>,
    ): Promise<string[]> =>
      new Promise((resolve, reject) => {
        const id = Date.now();

        worker.postMessage({ type: "suggest", id, query, locale, options });
        queues.suggest.push({ id, resolve, reject });
      }),

    search: (
      query: string,
      locale?: string,
      options?: SearchOptions<string, IndexItem>,
    ): Promise<SearchResult[]> =>
      new Promise<SearchResult[]>((resolve, reject) => {
        const id = Date.now();

        worker.postMessage({ type: "search", id, query, locale, options });
        queues.search.push({ id, resolve, reject });
      }),

    all: (
      query: string,
      locale?: string,
      options?: SearchOptions<string, IndexItem>,
    ): Promise<QueryResult> =>
      new Promise<QueryResult>((resolve, reject) => {
        const id = Date.now();

        worker.postMessage({ type: "all", id, query, locale, options });
        queues.all.push({ id, resolve, reject });
      }),

    terminate: (): void => {
      worker.terminate();

      values(queues).forEach((item) => {
        item.forEach(({ reject }) =>
          reject(new Error("Worker has been terminated.")),
        );
      });
    },
  };
};
