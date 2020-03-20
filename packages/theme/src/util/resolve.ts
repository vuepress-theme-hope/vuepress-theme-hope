/*
 * @Author: Mr.Hope
 * @Date: 2020-03-19 23:52:06
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-03-20 09:46:16
 * @Description: Navbar and Sidebar config handler
 */

/* eslint-disable max-params */
import { PageComputed, PageHeader, SiteData } from 'vuepress-types';
import {
  SideBarConfigItem,
  SideBarConfigItemObject
} from '@mr-hope/vuepress-shared-utils';
import {
  ensureEndingSlash,
  ensureExt,
  isExternal,
  normalize,
  resolvePath
} from './path';

interface SidebarGroup extends SideBarConfigItemObject {
  type: 'page' | 'group' | 'auto';
  basePath?: string;

  path?: string | null;
  children: SidebarGroup[];
}

/**
 * 处理侧边栏的配置项，为其合并页面配置
 *
 * @param pages
 * @param rawPath 配置中的路径
 * @param base 部署基础路径
 */
export const resolvePageforSidebar = (
  pages: PageComputed[],
  configPath: string,
  base: string
): any => {
  // 外部链接
  if (isExternal(configPath))
    return {
      type: 'external',
      path: configPath
    };

  // 如果存在部署路径，则处理
  const rawPath = base ? resolvePath(configPath, base) : configPath;

  /** 处理过的真实路径 */
  const path = normalize(rawPath);

  // 在整个页面配置中寻找匹配
  for (let i = 0; i < pages.length; i++)
    // 找到匹配
    if (normalize(pages[i].regularPath) === path)
      // 返回合并了相应页面配置的侧边栏对象
      return {
        ...pages[i],
        type: 'page',
        path: ensureExt(pages[i].path)
      };

  // 未找到匹配的侧边栏
  console.error(`侧边栏处理: 侧边栏 "${rawPath}" 未找到匹配页面！`);

  return {};
};

/** 侧边栏标题配置 */
export interface SidebarHeaderConfig extends PageHeader {
  /** 子标题 */
  children?: SidebarHeaderConfig[];
}

/**
 * 将低等级的标题置于 h2 的 children 中
 *
 * @param headers
 */
export const groupSidebarHeaders = (
  headers: PageHeader[]
): SidebarHeaderConfig[] => {
  /** header 副本 */
  const copyheaders = headers.map(h => ({ ...h }));
  let lastH2: SidebarHeaderConfig;

  // 将所有标题置于 h2 下方
  copyheaders.forEach(h => {
    if (h.level === 2) lastH2 = h;
    else if (lastH2) (lastH2.children || (lastH2.children = [])).push(h);
  });

  // 过滤掉非 h2 的标题
  return headers.filter(h => h.level === 2);
};

/**
 * 处理侧边栏的分组的标题
 *
 * @param page 当前页面
 */
const resolveSidebarHeaders = (page: PageComputed): any => {
  const headers = groupSidebarHeaders(page.headers || []);

  return [
    {
      type: 'group',
      collapsable: false,
      title: page.title,
      path: null,
      children: headers.map(h => ({
        type: 'auto',
        title: h.title,
        basePath: page.path,
        path: `${page.path}#${h.slug}`,
        children: h.children || []
      }))
    }
  ];
};

/**
 * @param { Route } route
 * @param { Array<string|string[]> | Array<SidebarGroup> | [link: string]: SidebarConfig } config
 * @returns { base: string, config: SidebarConfig }
 */
export const resolveMatchingConfig = (
  regularPath: string,
  config:
    | string[]
    | string[][]
    | SideBarConfigItem[]
    | Record<string, SideBarConfigItem>
): any => {
  if (Array.isArray(config))
    return {
      base: '/',
      config
    };

  for (const base in config)
    if (ensureEndingSlash(regularPath).indexOf(encodeURI(base)) === 0)
      return {
        base,
        config: config[base]
      };

  return {};
};

const resolveItem = (
  item: SidebarGroup,
  pages: PageComputed[],
  base: string,
  groupDepth = 1
): any => {
  if (typeof item === 'string') return resolvePageforSidebar(pages, item, base);
  else if (Array.isArray(item))
    return Object.assign(resolvePageforSidebar(pages, item[0], base), {
      title: item[1]
    });

  const children = item.children || [];
  if (children.length === 0 && item.path)
    return Object.assign(resolvePageforSidebar(pages, item.path, base), {
      title: item.title
    });

  return {
    ...item,
    type: 'group',
    children: children.map(child =>
      resolveItem(child, pages, base, groupDepth + 1)
    ),
    collapsable: item.collapsable !== false
  };
};

/**
 * @param page
 * @param regularPath
 * @param site
 * @param localePath
 * @returns { SidebarGroup }
 */
export const resolveSidebarItems = (
  page: PageComputed,
  regularPath: string,
  site: SiteData,
  localePath: string
): any => {
  const { themeConfig = {}, pages } = site;

  const localeConfig =
    localePath && themeConfig.locales
      ? themeConfig.locales[localePath] || themeConfig
      : themeConfig;

  const pageSidebarConfig =
    page.frontmatter.sidebar || localeConfig.sidebar || themeConfig.sidebar;
  if (pageSidebarConfig === 'auto') return resolveSidebarHeaders(page);

  const sidebarConfig = localeConfig.sidebar || themeConfig.sidebar;
  if (!sidebarConfig) return [];

  const { base, config } = resolveMatchingConfig(regularPath, sidebarConfig);
  return config
    ? config.map((item: SidebarGroup) => resolveItem(item, pages, base))
    : [];
};

export const resolveNavLinkItem = (navbarLink: any, beforeprefix = ''): any => {
  const prefix = beforeprefix + (navbarLink.prefix || '');

  const navbarItem = { ...navbarLink };

  if (prefix) {
    if (navbarItem.link !== undefined)
      navbarItem.link = prefix + navbarItem.link;
    delete navbarItem.prefix;
  }

  if (navbarItem.items && navbarItem.items.length)
    Object.assign(navbarItem, {
      type: 'links',
      items: navbarItem.items.map((item: any) =>
        resolveNavLinkItem(item, prefix)
      )
    });
  else navbarItem.type = 'link';

  return navbarItem;
};
