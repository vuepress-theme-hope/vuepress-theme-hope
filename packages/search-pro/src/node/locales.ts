import type { SearchProLocaleConfig } from "../shared/index.js";

/** Multi language config for search-pro popup */
export const searchProLocales: SearchProLocaleConfig = {
  "/en/": {
    close: "Close",
    placeholder: "Search",
    search: "Search",
    select: "to select",
    navigate: "to navigate",
    exit: "to exit",
    emply: "No results found",
    loading: "Loading search indexes...",
  },

  "/zh/": {
    close: "关闭",
    placeholder: "搜索",
    search: "搜索",
    select: "选择",
    navigate: "切换",
    exit: "关闭",
    emply: "没有找到结果",
    loading: "正在加载搜索索引...",
  },

  "/zh-tw/": {
    close: "關閉",
    placeholder: "搜索",
    search: "搜素",
    select: "選擇",
    navigate: "切換",
    exit: "關閉",
    emply: "沒有找到結果",
    loading: "正在加載搜索索引...",
  },
};
