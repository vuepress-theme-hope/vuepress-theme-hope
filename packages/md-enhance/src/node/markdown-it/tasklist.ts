/**
 * Forked from https://github.com/revin/markdown-it-task-lists/blob/master/index.js
 *
 * Copyright (c) 2016, Revin Guillen
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

import Token from "markdown-it/lib/token";
import {
  getParentTokenIndex,
  isInlineToken,
  isParagraphToken,
  isListItemToken,
  setTokenAttr,
} from "./utils";

import type { PluginWithOptions } from "markdown-it";
import type StateCore from "markdown-it/lib/rules_core/state_core";
import type { TaskListOptions } from "../../shared";

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

export const tasklist: PluginWithOptions<TaskListOptions> = (
  md,
  { label = true, labelAfter = true } = {}
) => {
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
