/**
 * @see https://stackoverflow.com/questions/223652/is-there-a-way-to-escape-a-cdata-end-token-in-xml
 */
export const encodeCDATA = (content: string): string =>
  content.replace(/]]>/g, "]]]]><![CDATA[>");

export const encodeXML = (content: string): string =>
  content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
