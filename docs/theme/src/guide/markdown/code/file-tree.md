---
title: File Tree
icon: folder-tree
category:
  - Markdown
tag:
  - File Tree
  - Markdown
---

Display a directory structure in your VuePress site.

<!-- more -->

## Settings

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    fileTree: true,
  },
});
```

## Syntax

Use a `file-tree` container with a Markdown unordered list inside to describe the structure. Nested list items create subdirectories, and a trailing `/` keeps a directory collapsed.

The following notations are also supported:

- `**name**` highlights the file or directory name.
- `name # comment` adds a comment to the name.
- `++ name` and `-- name` mark the file or directory as added or removed.
- `...` or `…` adds a placeholder item.

Any text after the container marker becomes the title of the file tree.

## Demo

:::: preview

::: file-tree VuePress Site

- .vuepress
  - ++ config.ts
  - -- legacy.ts
  - styles/
    - **index.scss**
- guide # the documentation
  - markdown
    - code
      - code-tree.md
      - file-tree.md
- package.json
- pnpm-lock.yaml
- …

:::

::::

::: tip

File and directory icons are provided by `@vuepress/plugin-icon` and `<VPIcon />`. When that plugin is disabled, generic icons are used instead.

:::
