---
title: Markdown DEMO
icon: fab fa-markdown
order: 2
category:
  - Cookbook
  - Markdown
tag:
  - Demo
  - Markdown
---

<!-- markdownlint-disable -->

::: md-demo Heading

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

:::

<!-- markdownlint-restore -->

::: md-demo Text

This sentence has **bold**, _italic_ and ~~delete~~ style text.

:::

::: md-demo Paragraph

This is a paragraph.

This is another paragraph.

:::

::: md-demo Line Break

I would like to line break at  
this point or\
this point

:::

::: md-demo Blockquotes

> Blockquotes can also be nested...
>
> > ...by using greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.

:::

::: md-demo Unordered List

- Create a list by starting a line with `-`
- Make sub-lists by indenting 2 spaces:

  - Marker character change forces new list start:

    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      link break

      New paragraph

- It's easy!

:::

::: md-demo Ordered List

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit  
   line break\
   line break again
1. Integer molestie lorem at massa

:::

::: md-demo HR

---

:::

::: md-demo Link

[Home page using absolute path](/)

[Home page using relative path](../../README.md)

:::

::: md-demo Other links supported in VuePress

- [Home page-Can route when editing Markdown file](../../README.md)

- [Home page using absolute path 2](/README.md)

- [Visit in HTML](../../index.html)

:::

::: md-demo Image

![Logo](/logo.png)

:::

::: md-demo Emoji

Classic:

:wink: :cry: :laughing: :yum:

Shortcuts:

8-) :) :\* :( :-) :-( ;)

:::

::: tip

For more see [emoji list](emoji/README.md)

:::

::: md-demo Tables

|           center           |                    right | left                    |
| :------------------------: | -----------------------: | :---------------------- |
| For center align use `:-:` | For right align use `-:` | For left align use `:-` |
|             b              |                aaaaaaaaa | aaaa                    |
|             c              |                     aaaa | a                       |

:::

::: md-demo Codes

Inline Code: `code`

Indented code:

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

Block code:

```
Sample text here...
```

Syntax highlighting:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

:::
