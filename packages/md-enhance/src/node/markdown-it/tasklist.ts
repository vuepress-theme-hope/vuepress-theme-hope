import MarkdownIt = require("markdown-it");
import TokenClass = require("markdown-it/lib/token");

let disableCheckboxes = true;
let useLabelWrapper = false;
let useLabelAfter = false;

const setAttr = (token: TokenClass, name: string, value: string): void => {
  const index = token.attrIndex(name);
  const attr: [string, string] = [name, value];

  if (index < 0) token.attrPush(attr);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  else token.attrs![index] = attr;
};

const parentToken = (tokens: TokenClass[], index: number): number => {
  const targetLevel = tokens[index].level - 1;

  for (let i = index - 1; i >= 0; i--)
    if (tokens[i].level === targetLevel) return i;

  return -1;
};

const isInline = (token: TokenClass): boolean => token.type === "inline";

const isParagraph = (token: TokenClass): boolean =>
  token.type === "paragraph_open";

const isListItem = (token: TokenClass): boolean =>
  token.type === "list_item_open";

// leading whitespace in a list item is already trimmed off by markdown-it
const startsWithTodoMarkdown = (token: TokenClass): boolean =>
  token.content.indexOf("[ ] ") === 0 ||
  token.content.indexOf("[x] ") === 0 ||
  token.content.indexOf("[X] ") === 0;

const isTodoItem = (tokens: TokenClass[], index: number): boolean => {
  return (
    isInline(tokens[index]) &&
    isParagraph(tokens[index - 1]) &&
    isListItem(tokens[index - 2]) &&
    startsWithTodoMarkdown(tokens[index])
  );
};

const todoify = (
  token: TokenClass,
  TokenConstructor: typeof TokenClass
): void => {
  token.children = token.children || [];

  token.children.unshift(makeCheckbox(token, TokenConstructor));
  token.children[1].content = token.children[1].content.slice(3);
  token.content = token.content.slice(3);

  if (useLabelWrapper) {
    if (useLabelAfter) {
      token.children.pop();

      // Use large random number as id property of the checkbox.
      const id = `task-item-${Math.ceil(
        Math.random() * (10000 * 1000) - 1000
      )}`;
      token.children[0].content =
        token.children[0].content.slice(0, -1) + ' id="' + id + '">';
      token.children.push(afterLabel(token.content, id, TokenConstructor));
    } else {
      token.children.unshift(beginLabel(TokenConstructor));
      token.children.push(endLabel(TokenConstructor));
    }
  }
};

const makeCheckbox = (
  token: TokenClass,
  TokenConstructor: typeof TokenClass
): TokenClass => {
  const checkbox = new TokenConstructor("html_inline", "", 0);
  const disabledAttr = disableCheckboxes ? ' disabled="" ' : "";
  if (token.content.indexOf("[ ] ") === 0) {
    checkbox.content =
      '<input class="task-list-item-checkbox"' +
      disabledAttr +
      'type="checkbox">';
  } else if (
    token.content.indexOf("[x] ") === 0 ||
    token.content.indexOf("[X] ") === 0
  ) {
    checkbox.content =
      '<input class="task-list-item-checkbox" checked=""' +
      disabledAttr +
      'type="checkbox">';
  }
  return checkbox;
};

// these next two functions are kind of hacky; probably should really be a
// true block-level token with .tag=='label'
const beginLabel = (Token: typeof TokenClass): TokenClass => {
  const token = new Token("html_inline", "", 0);
  token.content = "<label>";

  return token;
};

const endLabel = (Token: typeof TokenClass): TokenClass => {
  const token = new Token("html_inline", "", 0);
  token.content = "</label>";
  return token;
};

const afterLabel = (
  content: string,
  id: string,
  TokenConstructor: typeof TokenClass
): TokenClass => {
  const token = new TokenConstructor("html_inline", "", 0);
  token.content =
    '<label class="task-list-item-label" for="' +
    id +
    '">' +
    content +
    "</label>";
  token.attrs = [["for", id]];
  return token;
};

export default (md: MarkdownIt, options: any): void => {
  if (options) {
    disableCheckboxes = !options.enabled;
    useLabelWrapper = !!options.label;
    useLabelAfter = !!options.labelAfter;
  }

  md.core.ruler.after("inline", "github-task-lists", (state) => {
    const tokens = state.tokens;

    for (let i = 2; i < tokens.length; i++) {
      if (isTodoItem(tokens, i)) {
        todoify(tokens[i], state.Token);
        setAttr(
          tokens[i - 2],
          "class",
          "task-list-item" + (!disableCheckboxes ? " enabled" : "")
        );
        setAttr(
          tokens[parentToken(tokens, i - 2)],
          "class",
          "task-list-container"
        );
      }
    }

    return true;
  });
};
