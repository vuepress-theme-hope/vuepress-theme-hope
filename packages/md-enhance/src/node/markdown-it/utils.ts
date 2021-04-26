import Token = require("markdown-it/lib/token");

export const setTokenAttr = (
  token: Token,
  name: string,
  value: string
): void => {
  const index = token.attrIndex(name);
  const attr: [string, string] = [name, value];

  if (index < 0) token.attrPush(attr);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  else token.attrs![index] = attr;
};

export const getParentTokenIndex = (tokens: Token[], index: number): number => {
  const targetLevel = tokens[index].level - 1;

  for (let i = index - 1; i >= 0; i--)
    if (tokens[i].level === targetLevel) return i;

  return -1;
};

export const isInlineToken = (token: Token): boolean => token.type === "inline";

export const isParagraphToken = (token: Token): boolean =>
  token.type === "paragraph_open";

export const isListItemToken = (token: Token): boolean =>
  token.type === "list_item_open";

export const escapeHtml = (unsafeHTML: string): string =>
  unsafeHTML
    .replace(/&/gu, "&amp;")
    .replace(/</gu, "&lt;")
    .replace(/>/gu, "&gt;")
    .replace(/"/gu, "&quot;")
    .replace(/'/gu, "&#039;");
