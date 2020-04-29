---
icon: writefill
---

# 上下角标

让你的 VuePress 站点中的 Markdown 文件支持标记。

## 配置

```js {6}
module.exports = {
  plugin: [
    'md-enhance',
    {
      // 开启标记
      mark: true
    }
  ]
};
```

## 语法

使用 `== ==` 进行标记。

## 案例

Mr.Hope ==十分==帅

```md
Mr.Hope ==十分==帅
```
