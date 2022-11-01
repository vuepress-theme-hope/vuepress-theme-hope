# PDF

PDF viewer component.

You can use this component to embed a PDF viewer.

<!-- more -->

## Demo

Default PDF viewer:

<PDF url="/sample.pdf" />

```md
<PDF url="/sample.pdf" />
```

PDF viewer without toolbar:

<PDF url="/sample.pdf" :toolbar="false" />

```md
<PDF url="/sample.pdf" :toolbar="false" />
```

PDF viewer with initial page 2:

<PDF url="/sample.pdf" :page="2" />

```md
<PDF url="/sample.pdf" :page="2" />
```
