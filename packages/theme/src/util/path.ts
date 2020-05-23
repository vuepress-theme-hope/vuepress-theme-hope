import { Route } from "vue-router";

/** 锚点匹配正则 */
export const hashRE = /#.*$/u;
/** 后缀匹配正则 */
export const extRE = /\.(md|html)$/u;
/** `/` 结尾匹配正则 */
export const endingSlashRE = /\/$/u;
/** 外部链接匹配正则 */
export const outboundRE = /^[a-z]+:/iu;

/**
 * 去除路径的文件后缀与锚点
 *
 * @param path 需要处理的路径
 */
export const normalize = (path: string): string =>
  decodeURI(path).replace(hashRE, "").replace(extRE, "");

/**
 * 获取路径中的锚点
 *
 * @param path 待处理的路径
 */
export const getHash = (path: string): string | void => {
  const match = hashRE.exec(path);
  if (match) return match[0];

  return "";
};

/**
 * 判断路径是否是外部链接
 *
 * @param path 待判断的路径
 */
export const isExternal = (path: string): boolean => outboundRE.test(path);

/**
 * 判断一个路径是否是邮件链接
 *
 * @param path 待判断的路径
 */
export const isMailto = (path: string): boolean => path.startsWith("mailto:");

/**
 * 判断一个路径是否是电话链接
 *
 * @param path 待判断的路径
 */
export const isTel = (path: string): boolean => path.startsWith("tel:");

/**
 * 确保路径有合理的后缀
 *
 * @param path 待处理的路径
 */
export const ensureExt = (path: string): string => {
  // 外部链接不处理
  if (isExternal(path)) return path;

  const hashMatch = hashRE.exec(path);
  const hash = hashMatch ? hashMatch[0] : "";
  const normalized = normalize(path);

  // 如果链接以 `/` 结尾不处理
  if (normalized.endsWith("/")) return path;

  // 添加 `.html` 后缀
  return `${normalized}.html${hash}`;
};

/**
 * 确保路径以斜线结尾
 *
 * @param path 待处理的路径
 */
export const ensureEndingSlash = (path: string): string =>
  /(\.html|\/)$/u.test(path) ? path : `${path}/`;

/**
 * 判断当前路由是否可以匹配指定链接
 *
 * @param route 当前路由
 * @param path 需要判断的链接
 */
export const isActive = (route: Route, path: string): boolean => {
  const routeHash = decodeURIComponent(route.hash);
  const linkHash = getHash(path);

  // 如果待判断的链接存在锚点，判断锚点是否相同
  if (linkHash && routeHash !== linkHash) return false;

  /** 路由路径 */
  const routePath = normalize(route.path);
  /** 待判断的链接路径 */
  const pagePath = normalize(path);

  // 在比较锚点的基础上进一步比较路径是否相同
  return routePath === pagePath;
};

/**
 * 处理路径
 * @param relative 需要处理的路径
 * @param base 部署的基础路径
 * @param append 是否直接添加
 */
export const resolvePath = (
  relative: string,
  base: string,
  append?: boolean
): string => {
  // 外部链接直接返回
  if (isExternal(relative)) return relative;

  /** 待处理路径得第一个字母 */
  const firstChar = relative.charAt(0);

  // 绝对路径直接返回
  if (firstChar === "/") return relative;

  // 路径全部是参数字符串或锚点，直接与 base 拼接
  if (firstChar === "?" || firstChar === "#") return base + relative;

  // 基础部署路径栈
  const stack = base.split("/");

  /*
   * remove trailing segment if:
   * - not appending
   * - appending to trailing slash (last segment is empty)
   */
  if (!append || !stack[stack.length - 1]) stack.pop();

  // resolve relative path
  const segments = relative.replace(/^\//u, "").split("/");
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (segment === "..") stack.pop();
    else if (segment !== ".") stack.push(segment);
  }

  // ensure leading slash
  if (stack[0] !== "") stack.unshift("");

  return stack.join("/");
};
