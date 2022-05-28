/**
 * Forked from https://github.com/linsir/markdown-it-task-checkbox/blob/master/index.js
 *
 * Copyright (c) 2016, Revin Guillen
 * Modified code Copyright (c) 2016, linsir, MIT License
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

import { default as Token } from "markdown-it/lib/token";
import {
  getParentTokenIndex,
  isInlineToken,
  isParagraphToken,
  isListItemToken,
  setTokenAttr,
} from "./utils";

import type { PluginWithOptions } from "markdown-it";
import type { default as StateCore } from "markdown-it/lib/rules_core/state_core";
import type { TaskListOptions } from "../../shared";

interface TaskListEnv {
  tasklists: number;
}

interface TaskListStateCore extends StateCore {
  env: TaskListEnv;
}
// The leading whitespace in a list item (token.content) is already trimmed off by markdown-it.
// The regex below checks for '[ ] ' or '[x] ' or '[X] ' at the start of the string token.content,
// where the space is either a normal space or a non-breaking space (character 160 = \u00A0).
const startsWithTodoMarkdown = (token: Token): boolean =>
  /^\[[xX \u00A0]\][ \u00A0]/.test(token.content);

const isTaskListItem = (tokens: Token[], index: number): boolean =>
  isInlineToken(tokens[index]) &&
  isParagraphToken(tokens[index - 1]) &&
  isListItemToken(tokens[index - 2]) &&
  startsWithTodoMarkdown(tokens[index]);

const generateCheckbox = (token: Token, id: string, disabled = true): Token => {
  const checkbox = new Token("checkbox_input", "input", 0);

  checkbox.attrs = [
    ["type", "checkbox"],
    ["class", "task-list-item-checkbox"],
    ["id", id],
  ];

  // if token.content starts with '[x] ' or '[X] '
  if (/^\[[xX]\][ \u00A0]/.test(token.content))
    checkbox.attrs.push(["checked", "checked"]);

  if (disabled) checkbox.attrs.push(["disabled", "disabled"]);

  return checkbox;
};

const beginLabel = (id: string): Token => {
  const label = new Token("label_open", "label", 1);

  label.attrs = [
    ["class", "task-list-item-label"],
    ["for", id],
  ];

  return label;
};

const endLabel = (): Token => new Token("label_close", "label", -1);

const todoify = (
  token: Token,
  state: TaskListStateCore,
  options: Required<TaskListOptions>
): void => {
  const id = `task-item-${state.env.tasklists++}`;

  token.children = token.children || [];

  // remove the checkbox syntax letter
  token.children[0].content = token.children[0].content.slice(3);

  if (options.label) {
    // add label
    token.children.unshift(beginLabel(id));
    token.children.push(endLabel());
  }
  // checkbox
  token.children.unshift(generateCheckbox(token, id, options.disabled));
};

export const tasklist: PluginWithOptions<TaskListOptions> = (
  md,
  { disabled = true, label = true } = {}
) => {
  md.core.ruler.after(
    "inline",
    "github-task-lists",
    (state: TaskListStateCore) => {
      const tokens = state.tokens;

      if (!state.env.tasklists) state.env.tasklists = 0;

      for (let i = 2; i < tokens.length; i++) {
        if (isTaskListItem(tokens, i)) {
          todoify(tokens[i], state, { disabled, label });
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
