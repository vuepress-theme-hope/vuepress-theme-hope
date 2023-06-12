export const normalizePath = (url: string): string =>
  url.replace(/\/$/, "/index.html").replace(/(?:\.(md|html))?$/, ".html");
