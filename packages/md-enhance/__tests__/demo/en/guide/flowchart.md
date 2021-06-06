---
title: Flowchart
icon: tree
---

Let the Markdown file support flow chart in your VuePress site

<!-- more -->

This plugin is using [flowchart.js](https://github.com/adrai/flowchart.js) to support this feature.

## Configuration

```js {7}
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // Enable flowchart
        flowchart: true,
      },
    ],
  ],
};
```

## Syntax

### Markdown Syntax

````md
<!-- ↓ :preset is optional -->

```flow:preset

<!-- Your flowchart code here. -->

```
````

Available presets for now:

- `vue` (default)
- `ant`

## Demo

<!-- markdownlint-disable -->

```flow
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
```

<!-- markdownlint-restore -->

````md
```flow
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
```
````
