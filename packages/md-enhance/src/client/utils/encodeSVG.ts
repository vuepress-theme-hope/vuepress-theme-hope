export const encodeSVG = (svg: string): string =>
  `data:image/svg+xml;charset=utf8,${svg
    .replace(/<br>/g, "<br />")
    .replace(/%/g, "%25")
    .replace(/"/g, "%22")
    .replace(/'/g, "%27")
    .replace(/&/g, "%26")
    .replace(/#/g, "%23")
    .replace(/{/g, "%7B")
    .replace(/}/g, "%7D")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E")}`;
