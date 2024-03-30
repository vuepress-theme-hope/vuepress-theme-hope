import { values } from "@vuepress/helper/client";
import type { SearchOptions } from "slimsearch";

import { searchProOptions } from "./define.js";
import type { QueryResult, SearchResult } from "./typings/index.js";
import type { IndexItem } from "../shared/index.js";

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

const ERR_MSG = "Canceled because of new search request.";

export const createSearchWorker = (): SearchWorker => {
  const worker = new Worker(
    __VUEPRESS_DEV__
      ? new URL("./worker/index.js", import.meta.url)
      : `${__VUEPRESS_BASE__}${searchProOptions.worker}`,
    __VUEPRESS_DEV__ ? { type: "module" } : {},
  );

  const states: Record<"suggest" | "search" | "all", PromiseItem | null> = {
    suggest: null,
    search: null,
    all: null,
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
      const state = states[type];

      if (state?.id === timestamp) state.resolve(result);
    },
  );

  worker.addEventListener("error", (err) => {
    console.error("Search Worker error:", err);
  });

  return {
    suggest: (
      query: string,
      locale?: string,
      options?: SearchOptions<string, IndexItem>,
    ): Promise<string[]> =>
      new Promise((resolve, reject) => {
        states.suggest?.reject(new Error(ERR_MSG));
        const id = Date.now();

        worker.postMessage({ type: "suggest", id, query, locale, options });
        states.suggest = { id, resolve, reject };
      }),

    search: (
      query: string,
      locale?: string,
      options?: SearchOptions<string, IndexItem>,
    ): Promise<SearchResult[]> =>
      new Promise<SearchResult[]>((resolve, reject) => {
        states.search?.reject(new Error(ERR_MSG));

        const id = Date.now();

        worker.postMessage({ type: "search", id, query, locale, options });
        console.log("post");
        states.search = { id, resolve, reject };
      }),

    all: (
      query: string,
      locale?: string,
      options?: SearchOptions<string, IndexItem>,
    ): Promise<QueryResult> =>
      new Promise<QueryResult>((resolve, reject) => {
        states.all?.reject(new Error(ERR_MSG));

        const id = Date.now();

        worker.postMessage({ type: "all", id, query, locale, options });
        states.all = { id, resolve, reject };
      }),

    terminate: (): void => {
      worker.terminate();

      values(states).forEach((item) => {
        item?.reject(new Error("Worker has been terminated."));
      });
    },
  };
};
