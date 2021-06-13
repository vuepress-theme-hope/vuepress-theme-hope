import MarkdownIt = require("markdown-it");
import MarkdownContainer = require("markdown-it-container");
import { codeDemoRender } from "../../src/node/markdown-it/code-demo";

describe("footnote", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(
    MarkdownContainer,
    "demo",
    { render: codeDemoRender }
  );

  it("Pandoc example", () => {
    expect(
      markdownIt.render(
        `
::: demo A normal demo

\`\`\`html
<h1>Mr.Hope</h1>
<p>Is <span id="very">very</span> handsome</p>
\`\`\`

\`\`\`js
document.querySelector("#very").addEventListener("click", () => {
  alert("Very handsome!");
});
\`\`\`

\`\`\`css
span {
  color: red;
}
\`\`\`

:::

::: demo [react] A react demo

\`\`\`js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "very handsome" };
  }
  render() {
    return (
      <div className="box-react">
        Mr.Hope is <span>{this.state.message}</span>
      </div>
    );
  }
}
\`\`\`

\`\`\`css
.box-react span {
  color: red;
}
\`\`\`

:::

::: demo [vue] A vue demo

\`\`\`vue
<template>
  <div class="box-vue">
    Mr.Hope is <span>{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "very handsome" }),
};
</script>
<style>
.box-vue span {
  color: red;
}
</style>
\`\`\`

:::

::: demo A normal demo

\`\`\`md
# Title

is very handsome.
\`\`\`

\`\`\`ts
const message: string = "Mr.Hope";

document.querySelector("h1").innerHTML = message;
\`\`\`

\`\`\`scss
h1 {
  font-style: italic;

  + p {
    color: red;
  }
}
\`\`\`

:::
`,
        {}
      )
    ).toMatchSnapshot();
  });
});
