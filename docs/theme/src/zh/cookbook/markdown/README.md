---
title: Markdown 介绍
icon: b:markdown
dir:
  collapsible: false
  order: 1
category:
  - 教程
  - Markdown
tag:
  - 介绍
  - Markdown
---

Markdown 是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式。

Markdown 的目标是实现「易读易写」。

<!-- more -->

## 概述

不过最需要强调的便是它的可读性。一份使用 Markdown 格式撰写的文件应该可以直接以纯文字发佈，并且看起来不会像是由许多标签或是格式指令所构成。Markdown 语法受到一些既有 text-to-HTML 格式的影响，包括 [Setext][1]、[atx][2]、[Textile][3]、[reStructuredText][4]、[Grutatext][5] 和 [EtText][6]，然而最大灵感来源其实是纯文字的电子邮件格式。

因此 Markdown 的语法全由标点符号所组成，并经过严谨慎选，是为了让它们看起来就像所要表达的意思。像是在文字两旁加上星号，看起来就像\*强调\*。Markdown 的列表看起来，嗯，就是列表。假如你有使用过电子邮件，引言写法看起来就真的像是引用一段文字。

Markdown 具有一系列衍生版本，用于扩展 Markdown 的功能 (如表格、脚注、内嵌 HTML 等等) ，这些功能原初的 Markdown 尚不具备，它们能让 Markdown 转换成更多的格式，例如 LaTeX，Docbook。Markdown 增强版中比较有名的有 Markdown Extra、MultiMarkdown、 Maruku 等。这些衍生版本要么基于工具，如 Pandoc；要么基于网站，如 GitHub 和 Wikipedia，在语法上基本兼容，但在一些语法和渲染效果上有改动。

## 用途

Markdown 的语法有个主要的目的: 用来作为一种网络内容的*写作*用语言。Markdown 的重点在于，它能让文件更容易阅读、编写。因此，Markdown 的格式语法只涵盖纯文字可以涵盖的范围。

Markdown 的语法简洁明了、学习容易，而且功能比纯文本更强，因此有很多人用它写博客。世界上最流行的博客平台 WordPress 能很好的支持 Markdown。

用于编写说明文档，并且以 `README.md` 的文件名保存在软件的目录下面。

除此之外，我们还可以快速将 Markdown 转化为演讲 PPT、Word 产品文档、LaTex 论文甚至是用非常少量的代码完成最小可用原型。在数据科学领域，Markdown 已经广泛使用，极大地推进了动态可重复性研究的历史进程。

## 块元素

### 段落和换行

一个段落是由一个以上相连接的行句组成，而一个以上的空行则会切分出不同的段落 (空行的定义是显示上看起来像是空行，便会被视为空行。比方说，若某一行只包含空白和 tab，则该行也会被视为空行) ，一般的段落不需要用空白或断行缩进。

「一个以上相连接的行句组成」这句话其实暗示了 Markdown 允许段落内的强迫断行，这个特性和其他大部分的 text-to-HTML 格式不一样 (包括 MovableType 的「Convert Line Breaks」选项) ，其它的格式会把每个断行都转成 `<br>` 标签。

如果你*真的*想要插入 `<br>` 标签的话，在行尾加上两个以上的空格或反斜线 (`\`)，然后按 Enter。

是的，这确实需要花比较多功夫来插入 `<br>` ，但是「每个换行都转换为 `<br>` 的方法在 Markdown 中并不适合， Markdown 中电子邮件式的 [块引言](#块引言) 和多段落的 [列表](#列表) 在使用换行来排版的时候，不但更好用，还更好阅读。

### 标题

标题能显示出文章的结构。

Markdown 支持两种标题的语法，[Setext][1] 和 [atx][2] 形式。

Atx 形式则是在行首插入 1 到 6 个 `#` ，对应到标题 1 到 6 阶，例如:

- H1: `# Header 1`
- H2: `## Header 2`
- H3: `### Header 3`
- H4: `#### Header 4`
- H5: `##### Header 5`
- H6: `###### Header 6`

### 块引言

Markdown 使用电子邮件形式的块引言，如果你很熟悉如何在电子信件中引言，你就知道怎么在 Markdown 文件中建立一个块引言，那会看起来像是你强迫断行，然后在每行的最前面加上 `>` :

```md
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
>
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.
```

Markdown 也允许你只在整个段落的第一行最前面加上 `>`。

块引言可以有阶层 (例如: 引言内的引言) ，只要根据层数加上不同数量的 `>` :

```md
> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.
```

引言的块内也可以使用其他的 Markdown 语法，包括标题、列表、代码块等:

```md
> ## This is a header
>
> 1. This is the first list item.
> 1. This is the second list item.
>
> Here's some example code:
>
> plain return shell_exec("echo $input | $markdown_script");
```

任何标准的文字编辑器都能简单地建立电子邮件样式的引言，例如 BBEdit ，你可以选取文字后然后从选单中选择*增加引言阶层*。

### 列表

Markdown 支持有序列表和无序列表。

无序列表使用减号作为列表标记(也可使用星号、加号):

```md
- Red
- Green
- Blue
```

也可以(不建议):

<!-- prettier-disable -->

```md
- Red
- Green
- Blue

* Red
* Green
* Blue
```

<!-- prettier-enable -->

有序列表则使用数字接着一个英文句点:

```md
1. Bird
2. McHale
3. Parish
```

很重要的一点是，你在列表标记上使用的数字并不会影响输出的 HTML 结果，上面的列表所产生的 HTML 标记为:

```html
<ol>
  <li>Bird</li>
  <li>McHale</li>
  <li>Parish</li>
</ol>
```

如果你的列表标记写成:

```md
1. Bird
1. McHale
1. Parish
```

你都会得到完全相同的 HTML 输出。重点在于，你可以让 Markdown 文件的列表数字和输出的结果相同，或是你懒一点都写作 `1` 你可以完全不用在意数字的正确性。

列表项目标记通常是放在最左边，但是其实也可以缩进，最多三个空白，项目标记后面则一定要接着至少一个空白或 tab。

要让列表看起来更漂亮，你可以把内容用固定的缩进整理好:

```md
- Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
  Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
  viverra nec, fringilla in, laoreet vitae, risus.
- Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
  Suspendisse id sem consectetuer libero luctus adipiscing.
```

但是如果你很懒，那也不一定需要。

如果列表项目间用空行分开， Markdown 会把项目的内容在输出时用 `<p>` 标签包起来，举例来说:

```md
- Bird
- Magic
```

会被转换为:

```html
<ul>
  <li>Bird</li>
  <li>Magic</li>
</ul>
```

但是这个:

```md
- Bird

- Magic
```

会被转换为:

```html
<ul>
  <li><p>Bird</p></li>
  <li><p>Magic</p></li>
</ul>
```

列表项目可以包含多个段落，每个项目下的段落都必须缩进 3 个空白或是一个 tab :

```md
1. This is a list item with two paragraphs. Lorem ipsum dolor
   sit amet, consectetuer adipiscing elit. Aliquam hendrerit
   mi posuere lectus.

   Vestibulum enim wisi, viverra nec, fringilla in, laoreet
   vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
   sit amet velit.

2. Suspendisse id sem consectetuer libero luctus adipiscing.
```

如果你每行都有缩进，看起来会看好很多，当然，再次地，如果你很懒惰，Markdown 也允许只有段落首行缩进。

如果要在列表项目内放进引言，那 `>` 就需要缩进:

```md
- A list item with a blockquote:

  > This is a blockquote
  > inside a list item.
```

当然，项目列表很可能会不小心产生，像是下面这样的写法:

```md
1986. What a great season.
```

换句话说，也就是在行首出现*数字-句点-空白*，要避免这样的状况，你可以在句点前面加上反斜线。

```md
1986\. What a great season.
```

### 代码块

和代码相关的写作或是标签语言原始码通常会有已经排版好的代码块，通常这些块我们并不希望它以一般段落文件的方式去排版，而是照原来的样子显示，Markdown 会用 `<pre>` 和 `<code>` 标签来把代码块包起来。

要在 Markdown 中建立代码块很简单，只要简单地缩进 4 个空白或是 1 个 tab 就可以，例如，下面的输入:

```md
This is a normal paragraph:

    This is a code block.
```

Markdown 会转换成:

```html
<p>This is a normal paragraph:</p>

<pre>
  <code>This is a code block.</code>
</pre>
```

这里的缩进 (4 个空白或是 1 个 tab) ，都会被移除，例如:

```md
    Here is an example of AppleScript:

    tell application "Foo"
    beep
    end tell
```

会被转换为:

```html
<p>Here is an example of AppleScript:</p>

<pre><code>tell application "Foo"
  beep
end tell
</code></pre>
```

一个代码块会一直持续到没有缩进的那一行 (或是文件结尾) 。

在代码块里面， `&` 、 `<` 和 `>` 会自动转成 HTML 实体，这样的方式让你非常容易使用 Markdown 插入范例用的 HTML 原始码，只需要复制粘贴，再加上缩进就可以了，剩下的 Markdown 都会帮你处理，例如:

```
    <div class="footer">
      &copy; 2004 Foo Corporation
    </div>
```

会被转换为:

```html
<pre>
  <code>&lt;div class="footer"&gt;
  &amp;copy; 2004 Foo Corporation
&lt;/div&gt;</code>
</pre>
```

代码块中，一般的 Markdown 语法不会被转换，像是星号便只是星号，这表示你可以很容易地以 Markdown 语法撰写 Markdown 语法相关的文件。

如果你想要在代码块里输入用 Markdown 表示的代码库，你可以进行嵌套。

`````md
````md
```js
const a = 1;
```
````
`````

会渲染为

````md
```js
const a = 1;
```
````

### 分隔线

你可以在一行中用三个或以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。

```md
一些内容

---

另一些内容
```

## 行内元素

### 链接

Markdown 支持两种形式的链接语法: *行内*和*参考*两种形式。

不管是哪一种，链接的文字都是用 `[方括号]` 来标记。

要建立一个行内形式的链接，只要在方块括号后面马上接着括号并插入网址链接即可，如果你还想要加上链接的 title 文字，只要在网址后面，用双引号把 title 文字包起来即可，例如:

```html
This is [an example](http://example.com/ "Title") inline link. [This
link](http://example.net/) has no title attribute.
```

会产生:

```html
<p>
  This is <a href="http://example.com/" title="Title"> an example</a> inline
  link.
</p>

<p><a href="http://example.net/">This link</a> has no title attribute.</p>
```

如果你是要链接到同样主机的资源，你可以使用相对路径:

```md
See my [About](/about/) page for details.
```

参考形式的链接使用另外一个方括号接在链接文字的括号后面，而在第二个方括号里面要填入用以辨识链接的标签:

```md
This is [an example][id] reference-style link.
```

接着，在文件的任意处，你可以把这个标签的链接内容定义出来:

```md
[id]: http://example.com/ "Optional Title Here"
```

链接定义的形式为:

- 方括号，输入链接的标识 ID
- 冒号
- 一个以上的空白或 tab
- 链接的网址
- 选择性地添加 title 内容，可以用单引号、双引号或是括号包括

下面这三种链接的定义相同:

```md
[foo]: http://example.com/ "Optional Title Here"
[foo]: http://example.com/ "Optional Title Here"
[foo]: http://example.com/ "Optional Title Here"
```

**请注意:** 有一个已知的问题是 Markdown.pl 1.0.1 会忽略单引号包起来的链接 title。

链接网址也可以用方括号包起来:

```md
[id]: http://example.com/ "Optional Title Here"
```

你也可以把 title 属性放到下一行，也可以加一些缩进，网址太长的话，这样会比较好看:

```md
[id]: http://example.com/longish/path/to/resource/here "Optional Title Here"
```

网址定义只有在产生链接的时候用到，并不会直接出现在文件之中。

链接辨识标签可以有字母、数字、空白和标点符号，但是并**不**区分大小写，因此下面两个链接是一样的:

```md
[link text][a]
[link text][a]
```

*预设的链接标签*功能让你可以省略指定链接标签，这种情形下，链接标签和链接文字会视为相同，要用预设链接标签只要在链接文字后面加上一个空的方括号，如果你要让 "Google" 链接到 google.com，你可以简化成:

```md
[Google][]
```

然后定义链接内容:

```md
[google]: http://google.com/
```

由于链接文字可能包含空白，所以这种简化的标签内也可以包含多个文字:

```md
Visit [Daring Fireball][] for more information.
```

然后接着定义链接:

```md
[daring fireball]: http://daringfireball.net/
```

链接的定义可以放在文件中的任何一个地方，我比较偏好直接放在链接出现段落的后面，你也可以把它放在文件最后面，就像是注解一样。

下面是一个参考式链接的范例:

```md
I get 10 times more traffic from [Google][1] than from
[Yahoo][2] or [MSN][3].

[1]: http://google.com/ "Google"
[2]: http://search.yahoo.com/ "Yahoo Search"
[3]: http://search.msn.com/ "MSN Search"
```

如果改成用链接名称的方式写:

```md
I get 10 times more traffic from [Google][] than from
[Yahoo][] or [MSN][].

[google]: http://google.com/ "Google"
[yahoo]: http://search.yahoo.com/ "Yahoo Search"
[msn]: http://search.msn.com/ "MSN Search"
```

上面两种写法都会产生下面的 HTML。

```html
<p>
  I get 10 times more traffic from
  <a href="http://google.com/" title="Google">Google</a> than from
  <a href="http://search.yahoo.com/" title="Yahoo Search">Yahoo</a>
  or <a href="http://search.msn.com/" title="MSN Search">MSN</a>.
</p>
```

下面是用行内形式写的同样一段内容的 Markdown 文件，提供作为比较之用:

```md
I get 10 times more traffic from [Google](http://google.com/ "Google")
than from [Yahoo](http://search.yahoo.com/ "Yahoo Search") or
[MSN](http://search.msn.com/ "MSN Search").
```

参考式的链接其实重点不在于它比较好写，而是它比较好读，比较一下上面的范例，使用参考式的文章本身只有 81 个字元，但是用行内形式的链接却会增加到 176 个字元，如果是用纯 HTML 格式来写，会有 234 个字元，在 HTML 格式中，标签比文字还要多。

使用 Markdown 的参考式链接，可以让文件更像是浏览器最后产生的结果，让你可以把一些标记相关的资讯移到段落文字之外，你就可以增加链接而不让文章的阅读感觉被打断。

### 强调

Markdown 使用星号 (`*`) 和底线 (`_`) 作为标记强调字词的符号，被 `*` 或 `_` 包围的字词会被转成用 `<em>` 标签包围，用两个 `*` 或 `_` 包起来的话，则会被转成 `<strong>`，例如:

```md
**double asterisks** (建议)

**double underscores** (建议)

_single asterisks_

_single underscores_
```

会转成:

```html
<em>single asterisks</em>

<em>single underscores</em>

<strong>double asterisks</strong>

<strong>double underscores</strong>
```

你可以随便用你喜欢的样式，唯一的限制是，你用什么符号开启标签，就要用什么符号结束。

强调也可以直接插在文字中间:

```md
un*frigging*believable
```

但是如果你的 `*` 和 `_` 两边都有空白的话，它们就只会被当成普通的符号。

如果要在文字前后直接插入普通的星号或底线，你可以用反斜线:

```md
\*this text is surrounded by literal asterisks\*
```

### 代码

如果要标记一小段行内代码，你可以用反引号把它包起来 (`` ` ``) ，例如:

```md
Use the `printf()` function.
```

会产生:

```md
<p>Use the <code>printf()</code> function.</p>
```

如果要在代码内插入反引号，你可以用多个反引号来开启和结束行内代码:

```md
``There is a literal backtick (`) here.``
```

这段语法会产生:

```html
<p><code>There is a literal backtick (`) here.</code></p>
```

代码码区段的起始和结束端都可以放入一个空白，起始端后面一个，结束端前面一个，这样你就可以在区段的一开始就插入反引号:

```md
A single backtick in a code span: `` ` ``

A backtick-delimited string in a code span: `` `foo` ``
```

会产生:

```html
<p>A single backtick in a code span: <code>`</code></p>

<p>A backtick-delimited string in a code span: <code>`foo`</code></p>
```

在代码码区段内，`&` 和方括号都会被转成 HTML 实体，这样会比较容易插入 HTML 原始码，Markdown 会把下面这段:

```md
Please don't use any `<blink>` tags.
```

转为:

```html
<p>Please don't use any <code>&lt;blink&gt;</code> tags.</p>
```

你也可以这样写:

```md
`&#8212;` is the decimal-encoded equivalent of `&mdash;`.
```

以产生:

```html
<p>
  <code>&amp;#8212;</code> is the decimal-encoded equivalent of
  <code>&amp;mdash;</code>.
</p>
```

### 图片

很明显地，要在纯文字应用中设计一个「自然」的语法来插入图片是有一定难度的。

Markdown 使用一种和链接很相似的语法来标记图片，同样也允许两种样式: _行内_ 和 _参考_。

行内图片的语法看起来像是:

```md
![Alt text](/path/to/img.jpg)

![Alt text](/path/to/img.jpg "Optional title")
```

详细叙述如下:

- 一个惊叹号 `!`
- 一个方括号，里面放上图片的替代文字
- 一个普通括号，里面放上图片的网址，最后还可以用引号包住并加上
  选择性的 title 文字。

参考式的图片语法则长得像这样:

```md
![Alt text][id]
```

「id」是图片参考的名称，图片参考的定义方式则和链接参考一样:

```md
[id]: url/to/image "Optional title attribute"
```

到目前为止， Markdown 还没有办法指定图片的宽高，如果你需要的话，你可以使用普通的 `<img>` 标签。

### 其他文本样式

- 删除:`~~delete~~`
- 段落: 段落之间空一行
- 换行符: 一行结束时输入两个空格

---

## 其它

### 自动链接

Markdown 支持比较简短的自动链接形式来处理网址和电子邮件信箱，只要是用方括号包起来， Markdown 就会自动把它转成链接，链接的文字就和链接位置一样，例如:

```md
<http://example.com/>
```

Markdown 会转为:

```html
<a href="http://example.com/">http://example.com/</a>
```

自动的邮件链接也很类似，只是 Markdown 会先做一个编码转换的过程，把文字字元转成 16 进位码的 HTML 实体，这样的格式可以混淆一些不好的信箱地址收集机器人，例如:

```md
<address@example.com>
```

Markdown 会转成:

```html
<a
  href="&#x6D;&#x61;i&#x6C;&#x74;&#x6F;:&#x61;&#x64;&#x64;&#x72;&#x65;&#115;&#115;&#64;&#101;&#120;&#x61;&#109;&#x70;&#x6C;e&#x2E;&#99;&#111;&#109;"
  >&#x61;&#x64;&#x64;&#x72;&#x65;&#115;&#115;&#64;&#101;&#120;&#x61;&#109;&#x70;&#x6C;e&#x2E;&#99;&#111;&#109;</a
>
```

在浏览器里面，这段字串会变成一个可以点击的 <address@example.com> 链接。

(这种作法虽然可以混淆不少的机器人，但并无法全部挡下来，不过这样也比什么都不做好些。无论如何，公开你的信箱终究会引来广告信件的。)

### 转义字符

Markdown 可以利用反斜线来插入一些在语法中有其它意义的符号，例如: 如果你想要用星号加在文字旁边的方式来做出强调效果 (但不用 `<em>` 标签) ，你可以在星号的前面加上反斜线:

```md
\*literal asterisks\*
```

Markdown 支持在下面这些符号前面加上反斜线来帮助插入普通的符号:

- `\` 反斜线
- `` ` `` 反引号
- `*` 星号
- `_` 底线
- `{}` 大括号
- `[]` 方括号
- `()` 括号
- `#` 井字号
- `+` 加号
- `-` 减号
- `.` 英文句点
- `!` 惊叹号

## 快捷键

| 输出后的效果  | Markdown   | 快捷键         |
| ------------- | ---------- | -------------- |
| **Bold**      | `**text**` | Ctrl/⌘ + B     |
| _Emphasize_   | `*text*`   | Ctrl/⌘ + I     |
| `Inline Code` | \`code\`   | 选中后 `` ` `` |

## 表格

|     居中      |         右对齐 | 左对齐         |
| :-----------: | -------------: | :------------- |
| 居中使用`:-:` | 右对齐使用`-:` | 左对齐使用`:-` |
|       b       |      aaaaaaaaa | aaaa           |
|       c       |           aaaa | a              |

## Emoji

`:emoji名称:`

Example: `:smile:` :smile:

你可以在 [Emoji 列表](./emoji/README.md) 找到所有可用的 Emoji。

### 行内 HTML

不在 Markdown 涵盖范围之外的标签，都可以直接在文件里面用 HTML 撰写。不需要额外标注这是 HTML 或是 Markdown；只要直接加标签就可以了。

只有块元素 ── 比如 `<div>`、`<table>`、`<pre>`、`<p>` 等标签，必须在前后加上空行，以利与内容区隔。而且这些 (元素) 的开始与结尾标签，不可以用 tab 或是空白来缩进。Markdown 的解析器有智慧型判断，可以避免在块标签前后加上没有必要的 `<p>` 标签。

举例来说，在 Markdown 文件里加上一段 HTML 表格:

```md
This is a regular paragraph.

<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>

This is another regular paragraph.
```

请注意，Markdown 语法在 HTML 块标签中将不会被进行处理。例如，你无法在 HTML 块内使用 Markdown 形式的 `*强调*`。

### 特殊字元自动转换

在 HTML 文件中，有两个字元需要特殊处理: `<` 和 `&` 。 `<` 符号用于起始标签，`&` 符号则用于标记 HTML 实体，如果你只是想要使用这些符号，你必须要使用实体的形式，像是 `&lt;` 和 `&amp;`。

`&` 符号其实很容易让写作网络文件的人感到困扰，如果你要打「AT&T」 ，你必须要写成「`AT&amp;T`」 ，还得转换网址内的 `&` 符号，如果你要链接到 `http://images.google.com/images?num=30&q=larry+bird`

你必须要把网址转成:

```html
http://images.google.com/images?num=30&amp;q=larry+bird
```

才能放到链接标签的 `href` 属性里。不用说也知道这很容易忘记，这也可能是 HTML 标准检查所检查到的错误中，数量最多的。

Markdown 允许你直接使用这些符号，但是你要小心跳脱字元的使用，如果你是在 HTML 实体中使用 `&` 符号的话，它不会被转换，而在其它情形下，它则会被转换成 `&amp;`。所以你如果要在文件中插入一个著作权的符号，你可以这样写:

```md
&copy;
```

Markdown 将不会对这段文字做修改，但是如果你这样写:

```md
AT&T
```

Markdown 就会将它转为:

```html
AT&amp;T
```

类似的状况也会发生在 `<` 符号上，因为 Markdown 支持 [行内 HTML](#行内-html) ，如果你是使用 `<` 符号作为 HTML 标签使用，那 Markdown 也不会对它做任何转换，但是如果你是写:

```md
4 < 5
```

Markdown 将会把它转换为:

```html
4 &lt; 5
```

不过需要注意的是，code 范围内，不论是行内还是块， `<` 和 `&` 两个符号都*一定*会被转换成 HTML 实体，这项特性让你可以很容易地用 Markdown 写 HTML code (和 HTML 相对而言， HTML 语法中，你要把所有的 `<` 和 `&` 都转换为 HTML 实体，才能在 HTML 文件里面写出 HTML code。)

## Markdown 效果演示

- [查看详情](demo.md)

[1]: http://docutils.sourceforge.net/mirror/setext.html
[2]: http://www.aaronsw.com/2002/atx/
[3]: http://textism.com/tools/textile/
[4]: http://docutils.sourceforge.net/rst.html
[5]: http://www.triptico.com/software/grutatxt.html
[6]: http://ettext.taint.org/doc/
