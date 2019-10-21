---
icon: infofill
---

# 简介及内容展示

## 主题特点

主题继承了 Vupress 的默认主题，并很大程度上保持了 Vuepress 默认主题的风格。同时主题做了如下优化：

- 导航栏、侧边栏的外观美化与功能增强，同时了图标支持
- 主题色、夜间模式与全屏按钮
- 为所有页面添加阅读量展示、评论功能与图标、页脚支持
- 添加了新的路径导航功能

## Markdown 增强

### 上下角标测试

- 19^th^
- H~2~O

## 脚注测试

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

### DIY Container 测试

::: danger 非稳定状态
本主题仍在制作中，API 可能会有

~~~ center
重大的变动。
~~~

如果您在使用过程中遇到了bug，可以

~~~ right
[提一个issue](https://github.com/Mister-Hope/vuepress-theme-hope/issues)。
~~~

:::

### 流程图展示

@flowstart
st=>start: Start|past:>http://www.google.com[blank]
e=>end: End|future:>http://www.google.com
op1=>operation: My Operation|past
op2=>operation: Stuff|current
sub1=>subroutine: My Subroutine|invalid
cond=>condition: Yes
or No?|approved:>http://www.google.com
c2=>condition: Good idea|rejected
io=>inputoutput: catch something...|future

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
@flowend
