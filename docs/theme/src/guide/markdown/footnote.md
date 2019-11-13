---
icon: footnote
---

# 脚注 <MyBadge text="V0.0.8" />

让你的 VuePress 站点中的 Markdown 文件支持脚注。

## 配置

默认启用，你也可以在主题配置禁用它：

```js
module.exports = {
  themeConfig: {
    markdown: {
      // 启用脚注功能
      footnote: true
    }
  }
};
```

## 语法

- 在 Markdown 中使用 `[^锚点文字]` 来定义脚注。

- 在之后的任何位置使用 `[^锚点文字]: ...` 来描述脚注内容。

- 如果脚注包含多个段落，其后的段落应当保持双层缩进。

## 案例

脚注1链接[^first].

脚注2链接[^second].

行内的脚注^[Text of inline footnote] 定义.

Duplicated footnote reference[^second].

[^first]: 脚注 **可以包含特殊标记**

    也可以由多个段落组成

[^second]: 脚注文字。

```md
脚注1链接[^first].

脚注2链接[^second].

行内的脚注^[Text of inline footnote] 定义.

Duplicated footnote reference[^second].

[^first]: 脚注 **可以包含特殊标记**

    也可以由多个段落组成

[^second]: 脚注文字。
```
