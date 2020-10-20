---
icon: presentation
tags:
  - feature
  - markdown
---

# 幻灯片支持

让你的 VuePress 站点中的 Markdown 文件支持幻灯片。

本插件利用了 [reveal.js](https://revealjs.com/) 来支持这一功能。

## 配置

```js {3,6,7}
module.exports = {
  plugin: [
    "md-enhance",
    {
      // 启用幻灯片
      presentation: true,
    },
  ],
};
```

## 语法

- 使用 `---` 分割幻灯片
- 使用 `--` 对幻灯片进行二次分割(垂直显示)

```md
@slidestart [theme]

<!-- slide1 -->

---

<!-- slide2 -->

---

<!-- slide3 -->

@slideend
```

目前可用的主题:

- `auto` (默认)
- `black`
- `white`
- `league`
- `beige`
- `sky`
- `night`
- `serif`
- `simple`
- `solarized`
- `blood`
- `moon`

## 演示

@slidestart

## 幻灯片 1

一个有文字和 [链接](http://mrhope.site) 的段落

---

## 幻灯片 2

- 列表 1
- 列表 2

---

## 幻灯片 3.1

```js
const a = 1;
```

--

## 幻灯片 3.2

$$ J(\theta_0,\theta_1) = \sum_{i=0} $$

@slideend

````md
@slidestart

## 幻灯片 1

一个有文字和 [链接](http://mrhope.site) 的段落

---

## 幻灯片 2

- 列表 1
- 列表 2

---

## 幻灯片 3.1

```js
const a = 1;
```

--

## 幻灯片 3.2

$$ J(\theta_0,\theta_1) = \sum_{i=0} $$

@slideend
````

## 选项

您可以在 Frontmatter 设置 `reveal` 以设置特定页面的 reveal.js 选项，也可以在插件选项中设置 `presentation` 以全局设置 reveal.js。

更多选项，请参见[reveal.js config](https://revealjs.com/config/)，更多用法，请参阅 [reveal.js 文档](https://revealjs.com/)。
