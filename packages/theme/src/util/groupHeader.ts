import { PageHeader } from 'vuepress-types';

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
  const copyheaders = headers.map((h) => ({ ...h }));
  let lastH2: SidebarHeader;

  // 将所有标题置于 h2 下方
  copyheaders.forEach((h) => {
    if (h.level === 2) lastH2 = h;
    else if (lastH2) {
      if (!lastH2.children) lastH2.children = [];
      lastH2.children.push(h);
    }
  });

  // 过滤掉非 h2 的标题
  return copyheaders.filter((h) => h.level === 2);
};

export default groupHeaders;
