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

# Heading 1

<!-- markdownlint-restore -->

```md
# Heading 1
```

## Heading 2

```md
## Heading 2
```

### Heading 3

```md
### Heading 3
```

#### Heading 4

```md
#### Heading 4
```

##### Heading 5

```md
##### Heading 5
```

###### Heading 6

```md
###### Heading 6
```

## Text

This sentence has **bold**, _italic_ and ~~delete~~ style text.

```md
This sentence has **bold**, _italic_ and ~~delete~~ style text.
```

## Paragraph

This is a paragraph.

This is another paragraph.

```md
This is a paragraph.

This is another paragraph.
```

## Line Break

I would like to line break at
this point

```md
I would like to line break at
this point
```

::: tip

In codes above, two spaces are behind `at`.

:::

## Blockquotes

> Blockquotes can also be nested...
>
> > ...by using greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.

```md
> Blockquotes can also be nested...
>
> > ...by using greater-than signs right next to each other...
> >
> > > ...or with spaces between arrows.
```

## List

### Unordered List

- Create a list by starting a line with `-`
- Make sub-lists by indenting 2 spaces:

  - Marker character change forces new list start:

    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
      link break

      New paragraph

- It's easy!

```md
- Create a list by starting a line with `-`
- Sub-lists are made by indenting 2 spaces:

  - Marker character change forces new list start:

    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
      link break

      New paragraph

- Very easy!
```

### Ordered List

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit
   line break
   line break again
1. Integer molestie lorem at massa

```md
1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit
   line break
   line break again
1. Integer molestie lorem at massa
```

## HR

---

```md
---
```

## Link

[Home page using absolute path](/)

[Home page using relative path](../../README.md)

```md
[Home page using absolute path](/)

[Home page using relative path](../../README.md)
```

::: tip

You can also use these in VuePress:

- [Home page-Can route when editing Markdown file](../../README.md)

- [Home page using absolute path 2](/README.md)

- [Visit in HTML](../../index.html)

To be able to jump to each other when editing the Markdown using the editor, you need to use the **relative path**, also you must place `README.md` in **every folder**.

Code:

```md
- [Home page-Can route when editing Markdown file](../../README.md)

- [Home page using absolute path 2](/README.md)

- [Visit in HTML](../../index.html)
```

:::

## Image

![Logo](/logo.png)

```md
![Logo](/logo.png)
```

## Emoji

Classic:

:wink: :cry: :laughing: :yum:

```md
:wink: :cry: :laughing: :yum:
```

Shortcuts:

8-) :) :\* :( :-) :-( ;)

```md
8-) :) :\* :( :-) :-( ;)
```

::: tip

For more see [emoji list](emoji/README.md)

:::

## Tables

|           center           |                    right | left                    |
| :------------------------: | -----------------------: | :---------------------- |
| For center align use `:-:` | For right align use `-:` | For left align use `:-` |
|             b              |                aaaaaaaaa | aaaa                    |
|             c              |                     aaaa | a                       |

```md
|           center           |                    right | left                    |
| :------------------------: | -----------------------: | :---------------------- |
| For center align use `:-:` | For right align use `-:` | For left align use `:-` |
|             b              |                aaaaaaaaa | aaaa                    |
|             c              |                     aaaa | a                       |
```

## Codes

Inline Code: `code`

```md
Inline Code: `code`
```

Indented code:

```
// Some comments
line 1 of code
line 2 of code
line 3 of code
```

```
Indented code:

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code
```

Block code:

```
Sample text here...
```

````md
Block code:

```
Sample text here...
```
````

Syntax highlighting:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

````md
Syntax highlighting:

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```
````
