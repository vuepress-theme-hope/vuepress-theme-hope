export const encodePath = (path = ""): string =>
  encodeURI(path.replace(/[_ ]/g, "-"));
