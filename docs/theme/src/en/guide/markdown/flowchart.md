---
icon: flowchart
---

# flowchart <MyBadge text="V0.0.10+" />

Let the Markdown file support flow chart in your VuePress site

## Configuration

```js
module.exports = {
  themeConfig: {
    markdown: {
      flowchart: true
    }
  }
};
```

## Syntax

### Markdown Syntax

```markdown
@flowstart [preset]

<!-- Your flowchart code here. -->

@flowend
```

Available presets for now:

- `vue` (default)
- `ant`

## Demo

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

See [Flowchart Introduction](https://vuepress-md-enhance.mrhope.site/en/guide/flowchart.html#flowchart-intro).
