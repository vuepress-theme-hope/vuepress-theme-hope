import { PageHeader } from "@mr-hope/vuepress-types";

/** 侧边栏标题配置 */
export interface SidebarHeader extends PageHeader {
  /** 子标题 */
  children?: PageHeader[];
}

/**
 * 将低等级的标题置于 h2 的 children 中
 *
 * @param headers
 */
const groupHeaders = (headers: PageHeader[]): SidebarHeader[] => {
  /** header 副本 */
  const copyheaders = headers.map((header) => ({ ...header }));
  let lastH2: SidebarHeader;

  // 将所有标题置于 h2 下方
  copyheaders.forEach((header) => {
    if (header.level === 2) lastH2 = header;
    else if (lastH2) {
      if (!lastH2.children) lastH2.children = [];
      lastH2.children.push(header);
    }
  });

  // 过滤掉非 h2 的标题
  return copyheaders.filter((header) => header.level === 2);
};

export default groupHeaders;
