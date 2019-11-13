---
icon: markdown
---

# Markdown Introduction

Markdown is a markup language that can be written using a plain text editor that allows plain text content to be formatted with simple markup syntax.

Markdown has a series of derivative versions that extend Markdown's functionality (such as tables, footnotes, embedded HTML, etc.). These features were not available in the original Markdown. They can convert Markdown into more formats, such as LaTeX, Docbook. . Markdown Extra, MultiMarkdown, Maruku, etc. are more famous in Markdown's enhanced version. These derivative versions are either based on tools such as Pandoc; or based on websites such as GitHub and Wikipedia, which are basically syntactically compatible, but have some changes in syntax and rendering effects.

## Usage

Markdown's grammar is simple and straightforward, easy to learn, and features more powerful than plain text, so many people use it to write blogs. WordPress, the world's most popular blogging platform, and large CMSs such as Joomla and Drupal all support Markdown. The blog platforms that use the Markdown editor are Ghost and Typecho.

Used to write documentation and save it under the software's directory under the file name "README.md".
In addition, because we have a god-level editor like RStudio, we can quickly turn Markdown into a presentation PPT, Word product documentation, LaTex papers, and even a minimally usable prototype with very little code. In the field of data science, Markdown has been widely used, greatly promoting the historical process of dynamic repeatability research.

## ShortCut Key

| Display       | Code       | ShortCut Key |
| ------------- | ---------- | ------------ |
| **Bold**      | `**text**` | Ctrl/⌘ + B   |
| *Emphasize*   | `*text*`   | Ctrl/⌘ + I   |
| `Inline Code` | \`code\`   | 选中后"\`"   |

## Title

The title shows the structure of the article. Insert 1-6 # at the beginning of the line, each adding a # indicates a more in-depth content, corresponding to the depth of the title by 1-6.

- H1 :`# Header 1`
- H2 :`## Header 2`
- H3 :`### Header 3`
- H4 :`#### Header 4`
- H5 :`##### Header 5`
- H6 :`###### Header 6`

## Text Style

- Link :`[Title](URL)`
- Bold :`**Bold**`
- Italic:`*Italics*`
- Delete:`~~Italics~~`
- Paragraph : Space one link
- Line break : enter two space at the end of the line
- List : add `-` to become a list item
- Blockquote : `> Blockquote Content`
- HR : Enter `---` in a single line

## Link

`[Title](URL)`

e.g:`[Baidu](https://baidu.com)`

## Image

`![Alt](ImageLink)` 。

e.g:`![This is a title](/img/title.jpg)`.

## Tables

|           center           |                    right | left                    |
| :------------------------: | -----------------------: | :---------------------- |
| For center align use `:-:` | For right align use `-:` | For left align use `:-` |
|             b              |                aaaaaaaaa | aaaa                    |
|             c              |                     aaaa | a                       |

## Emoji

`:emoji name:`

eg:`:smile:`

## Markdown Display

- [View Detail](demo.md)
