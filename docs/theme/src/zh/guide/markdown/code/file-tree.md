---
title: 文件树
icon: folder-tree
category:
  - Markdown
tag:
  - Markdown
  - 文件树
---

在你的 VuePress 站点中展示目录结构。

<!-- more -->

## 配置

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    fileTree: true,
  },
});
```

## 语法

在 `file-tree` 容器中使用 Markdown 无序列表描述目录结构。嵌套的列表项会创建子目录，以 `/` 结尾的目录会保持折叠。

还支持以下标记：

- `**名称**` 会高亮文件或目录名。
- `名称 # 注释` 会为名称添加注释。
- `++ 名称` 与 `-- 名称` 会将文件或目录标记为新增或删除。
- `...` 或 `…` 会添加占位项。

容器标记后的文字会成为文件树的标题。

## 演示

:::: preview

::: file-tree VuePress 站点

- .vuepress
  - ++ config.ts
  - -- legacy.ts
  - styles/
    - **index.scss**
- guide # 文档
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

文件和目录图标由 `@vuepress/plugin-icon` 与 `<VPIcon />` 提供。禁用该插件时会使用通用图标。

:::
