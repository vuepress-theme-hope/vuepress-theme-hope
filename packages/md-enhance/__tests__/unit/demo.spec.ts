import MarkdownIt from "markdown-it";
import { describe, expect, it } from "vitest";

import {
  mdDemo,
  normalDemo,
  reactDemo,
  vueDemo,
} from "../../src/node/markdown-it/codeDemo.js";

describe("demo", () => {
  const markdownIt = MarkdownIt({ linkify: true })
    .use(normalDemo)
    .use(vueDemo)
    .use(reactDemo)
    .use(mdDemo);

  it("Should resolve demo info", () => {
    expect(
      markdownIt.render(
        `
::: normal-demo A normal demo

\`\`\`html
<h1>VuePress</h1>
<p>Is <span id="very">very</span> powerful</p>
\`\`\`

\`\`\`js
document.querySelector("#very").addEventListener("click", () => {
  alert("Very powerful!");
});
\`\`\`

\`\`\`css
span {
  color: red;
}
\`\`\`

:::

::: react-demo A react demo

\`\`\`js
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "very powerful" };
  }
  render() {
    return (
      <div className="box-react">
        VuePress is <span>{this.state.message}</span>
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

::: vue-demo A vue demo

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

::: normal-demo A normal demo

\`\`\`md
# Title

VuePress is powerful.
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

::: md-demo A Markdown demo

# Title

VuePress is powerful.

:::
`,
      ),
    ).toMatchSnapshot();
  });
});
