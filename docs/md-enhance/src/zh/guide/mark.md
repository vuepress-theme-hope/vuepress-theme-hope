---
title: 标记
icon: write
---

让你的 VuePress 站点中的 Markdown 文件支持标记。

<!-- more -->

## 配置

```js {7}
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // 开启标记
        mark: true,
      },
    ],
  ],
};
```

## 语法

使用 `== ==` 进行标记。请注意两边需要有空格。

## 案例

Mr.Hope ==十分== 帅

```md
Mr.Hope ==十分== 帅
```
