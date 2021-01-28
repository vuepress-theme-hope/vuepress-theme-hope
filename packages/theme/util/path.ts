import type { Route } from "vue-router";

export const hashRE = /#.*$/u;
export const extRE = /\.(md|html)$/u;
export const endingSlashRE = /\/$/u;
export const outboundRE = /^[a-z]+:/iu;

/** Remove hash and ext in a link */
export const normalize = (path: string): string =>
  decodeURI(path).replace(hashRE, "").replace(extRE, "");

export const getHash = (path: string): string | void => {
  const match = hashRE.exec(path);
  if (match) return match[0];

  return "";
};

/** Judge whether a path is external */
export const isExternal = (path: string): boolean => outboundRE.test(path);

/** Judge whether a path is `mailto:` link */
export const isMailto = (path: string): boolean => path.startsWith("mailto:");

/** Judge whether a path is `tel:` link */
export const isTel = (path: string): boolean => path.startsWith("tel:");

export const ensureExt = (path: string): string => {
  // do not resolve external links
  if (isExternal(path)) return path;

  const hashMatch = hashRE.exec(path);
  const hash = hashMatch ? hashMatch[0] : "";
  const normalized = normalize(path);

  // do not resolve links ending with `/`
  if (normalized.endsWith("/")) return path;

  // add `.html` ext
  return `${normalized}.html${hash}`;
};

export const ensureEndingSlash = (path: string): string =>
  /(\.html|\/)$/u.test(path) ? path : `${path}/`;

/** Judge whether a route match a link */
export const isActive = (route: Route, path: string): boolean => {
  const routeHash = decodeURIComponent(route.hash);
  const linkHash = getHash(path);

  // compare the hash only if the link has a hash
  if (linkHash && routeHash !== linkHash) return false;

  const routePath = normalize(route.path);
  const pagePath = normalize(path);

  return routePath === pagePath;
};

/**
 * @param path links being resolved
 * @param base deploy base
 * @param append whether append directly
 */
export const resolvePath = (
  path: string,
  base: string,
  append?: boolean
): string => {
  // do not resolve external links
  if (isExternal(path)) return path;

  const firstChar = path.charAt(0);

  // do not resolve absolute links
  if (firstChar === "/") return path;

  // if link is hash or query string, add with base
  if (firstChar === "?" || firstChar === "#") return `${base}${path}`;

  // base links stack
  const stack = base.split("/");

  /*
   * remove trailing segment if:
   * - not appending
   * - appending to trailing slash (last segment is empty)
   */
  if (!append || !stack[stack.length - 1]) stack.pop();

  // resolve relative path
  const segments = path.replace(/^\//u, "").split("/");
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (segment === "..") stack.pop();
    else if (segment !== ".") stack.push(segment);
  }

  // ensure leading slash
  if (stack[0] !== "") stack.unshift("");

  return stack.join("/");
};
