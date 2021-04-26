import MarkdownIt = require("markdown-it");
import StateCore = require("markdown-it/lib/rules_core/state_core");
import Token = require("markdown-it/lib/token");
import {
  getParentTokenIndex,
  isInlineToken,
  isParagraphToken,
  isListItemToken,
  setTokenAttr,
} from "./utils";
import type { TaskListOptions } from "../../types";

interface TaskListEnv {
  tasklists: number;
}

interface TaskListStateCore extends StateCore {
  env: TaskListEnv;
}

// leading whitespace in a list item is already trimmed off by markdown-it
const startsWithTodoMarkdown = (token: Token): boolean =>
  token.content.indexOf("[ ] ") === 0 ||
  token.content.indexOf("[x] ") === 0 ||
  token.content.indexOf("[X] ") === 0;

const isTaskListItem = (tokens: Token[], index: number): boolean => {
  return (
    isInlineToken(tokens[index]) &&
    isParagraphToken(tokens[index - 1]) &&
    isListItemToken(tokens[index - 2]) &&
    startsWithTodoMarkdown(tokens[index])
  );
};

const generateCheckbox = (token: Token): Token => {
  const checkbox = new Token("html_inline", "", 0);

  checkbox.content = `<input type="checkbox" class="task-list-item-checkbox" ${
    token.content.indexOf("[ ] ") === 0 ? "" : 'checked="checked"'
  } disabled="disabled">`;

  return checkbox;
};

// these next two functions are kind of hacky; probably should really be a
// true block-level token with .tag=='label'
const beginLabel = (): Token => {
  const token = new Token("html_inline", "", 0);
  token.content = "<label>";

  return token;
};

const endLabel = (): Token => {
  const token = new Token("html_inline", "", 0);
  token.content = "</label>";
  return token;
};

const afterLabel = (content: string, id: string): Token => {
  const token = new Token("html_inline", "", 0);

  token.content =
    '<label class="task-list-item-label" for="' +
    id +
    '">' +
    content +
    "</label>";
  token.attrs = [["for", id]];

  return token;
};

const todoify = (
  token: Token,
  state: TaskListStateCore,
  options: Required<TaskListOptions>
): void => {
  token.children = token.children || [];

  // add checkbox input
  token.children.unshift(generateCheckbox(token));

  // remove the checkbox syntax letter
  token.children[1].content = token.children[1].content.slice(3);
  token.content = token.content.slice(3);

  if (options.label)
    if (options.labelAfter) {
      token.children.pop();

      const id = `task-item-${state.env.tasklists++}`;
      token.children[0].content =
        token.children[0].content.slice(0, -1) + ' id="' + id + '">';
      token.children.push(afterLabel(token.content, id));
    } else {
      token.children.unshift(beginLabel());
      token.children.push(endLabel());
    }
};

export default (
  md: MarkdownIt,
  { label = true, labelAfter = true }: TaskListOptions = {}
): void => {
  md.core.ruler.after(
    "inline",
    "github-task-lists",
    (state: TaskListStateCore) => {
      const tokens = state.tokens;

      if (!state.env.tasklists) state.env.tasklists = 0;

      for (let i = 2; i < tokens.length; i++) {
        if (isTaskListItem(tokens, i)) {
          todoify(tokens[i], state, { label, labelAfter });
          setTokenAttr(tokens[i - 2], "class", "task-list-item");
          setTokenAttr(
            tokens[getParentTokenIndex(tokens, i - 2)],
            "class",
            "task-list-container"
          );
        }
      }

      return true;
    }
  );
};
