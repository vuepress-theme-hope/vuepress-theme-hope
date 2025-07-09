---
title: Markdown 示例
icon: b:markdown
order: 2
category:
  - 教程
  - Markdown
tag:
  - 示例
  - Markdown
---

<!-- markdownlint-disable -->

::: preview 标题

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

:::

<!-- markdownlint-restore -->

::: preview 文本

这句话里拥有**加粗**、*倾斜*和~~删除~~

:::

::: preview 段落

这是一个段落。

这是另一个段落。

:::

::: preview 换行

这是一句话不过我要在这里  
换行且\
再次换行

:::

::: tip

上方的代码中 `这里` 后面有两个空格

:::

::: preview 引用

> 引用也可以连用
>
> > 可以添加额外的大于号制造更深的引用

:::

::: preview 无序列表

- 无序列表项
- 无序列表项
  - 列表中的列表项
    - 更多的列表项
    - 更多的列表项
    - 更多的列表项
  - 列表中的长列表项，这个列表项很长。

    而且由很多个段落构成。

- 无序列表项

:::

::: preview 有序列表

1. 有序列表第一项
1. 有序列表第二项  
   第二项的需要换行\
   再次换行
1. 有序列表第三项

:::

::: tip

上方的代码中`换行`后面有也两个空格

:::

::: preview 分割线

---

:::

::: preview 链接

[根目录访问主页](/v2/)

[相对路径访问主页](../../README.md)

[根目录访问贡献指南](/v2/contribution)

[相对路径访问贡献指南](../../contribution.md)

:::

::: preview VuePress 兼容的其他链接

- [相对路径访问，兼容 Markdown 编写时相互跳转](../../README.md)

- [根目录访问主页 2](/README.md)

- [HTML 形式](../../index.html)

:::

::: preview 图片

![Logo](/logo.png)

:::

::: preview Emoji

经典方式:

:wink: :cry: :laughing: :yum:

简写:

8-) :) :\* :( :-) :-( ;)

:::

::: tip

更多详见[emoji 列表](emoji/README.md)

:::

::: preview 表格

|     居中      |         右对齐 | 左对齐         |
| :-----------: | -------------: | :------------- |
| 居中使用`:-:` | 右对齐使用`-:` | 左对齐使用`:-` |
|       b       |      aaaaaaaaa | aaaa           |
|       c       |           aaaa | a              |

:::

::: preview 代码

行内代码效果: `code`

缩进代码:

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

块级代码

```md
Sample text here...
```

高亮格式:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

:::
