export const normalizePath = (url: string): string =>
  url
    .replace(/\/(?:README\.md)$/i, "/index.html")
    .replace(/(?:\.(?:html|md))?$/, ".html");
