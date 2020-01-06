---
title: Markdown DEMO
icon: markdown
---

# First Heading

```md
# First Heading
```

## Second Heading

```md
## Second Heading
```

### Third Heading

```md
### Third Heading
```

#### Fourth Heading

```md
#### Fourth Heading
```

##### Fifth Heading

```md
##### Fifth Heading
```

###### Sixth Heading

```md
###### Sixth Heading
```

## Text

This sentence has **bold**、*italic*和~~delete~~ style text.

```md
This sentence has **bold**、*italic*和~~delete~~ style text.
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

:::tip
In codes above, two spaces are behind `at`.
:::

## Blockquotes

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

```md
> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

```

## List

### Unordered List

- Create a list by starting a line with `-`
- Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit  
      link break

      New paragraph
- Very easy!

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

## Ordered List

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit  
   line break  
   line break again
3. Integer molestie lorem at massa

```md
1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit  
   line break  
   line break again
3. Integer molestie lorem at massa
```

## HR

---

```md
---
```

## Link

[Home page using absolute path](/en/)

[Home page using relative path](../readme.md)

[About page using absolute path](/en/about)

[About page using relative path](../about.md)

```md
[Home page using absolute path](/en/)

[Home page using relative path](../readme.md)

[About page using absolute path](/en/about)

[About page using relative path](../about.md)
```

:::tip
You can alse use these in Vuepress:

- [Home page-Can route when editing markdown file](../readme.md)

- [Home page using absolute path 2](/readme.md)

- [Visit in HTML](../index.html)

If you want to be able to jump to each other when editing the markdown using the editor, you need to use the **relative path**, and `readme.md` **cannot** be omitted.

代码：

  ```md
- [Home page-Can route when editing markdown file](../readme.md)

- [Home page using absolute path 2](/readme.md)

- [Visit in HTML](../index.html)
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

8-) :) :* :( :-) :-( ;)

```md
8-) :) :* :( :-) :-( ;)
```

:::tip
For more see [emoji list](emoji.md)
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

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

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

    Block code:

    ```
    Sample text here...
    ```

Syntax highlighting:

``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

    Syntax highlighting:

    ```js
    var foo = function (bar) {
      return bar++;
    };

    console.log(foo(5));
    ```
