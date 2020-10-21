---
icon: flowchart
category: markdown
tags:
  - feature
  - markdown
---

# Flowchart

Let the Markdown file support flow chart in your VuePress site

## Configuration

```js {4}
module.exports = {
  themeConfig: {
    mdEnhance: {
      flowchart: true,
    },
  },
};
```

## Syntax

### Markdown Syntax

```markdown
@flowstart [preset]

<!-- Your flowchart code here. -->

@flowend
```

Available presets:

- `vue` (default)
- `ant`

## Demo

<!-- markdownlint-disable -->

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

<!-- markdownlint-restore -->

```md
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
```

## Flowchart Introduction

See [Flowchart Introduction](https://vuepress-md-enhance.mrhope.site/guide/flowchart/#flowchart-intro).
