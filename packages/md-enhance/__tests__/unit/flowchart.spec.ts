import MarkdownIt from "markdown-it";
import { describe, it, expect } from "vitest";
import { flowchart } from "../../src/node/markdown-it/index.js";

const demo = `st=>start: Start|past:>http://www.google.com[blank]
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
c2(no)->op2->e`;

describe("flowchart", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(flowchart);

  it("Should render ```flow", () => {
    const flowRenderResult = markdownIt.render(`
\`\`\`flow
${demo}
\`\`\`
`);

    expect(flowRenderResult).toMatch(
      /<FlowChart id="flowchart-.*?" code=".*?" preset="vue"><\/FlowChart>/
    );
    expect(flowRenderResult).toMatchSnapshot();
  });

  it("Should render ```flowchart", () => {
    const flowChartRenderResult = markdownIt.render(`
\`\`\`flowchart
${demo}
\`\`\`
`);

    expect(flowChartRenderResult).toMatch(
      /<FlowChart id="flowchart-.*?" code=".*?" preset="vue"><\/FlowChart>/
    );
    expect(flowChartRenderResult).toMatchSnapshot();
  });

  it("Should not render", () => {
    expect(
      markdownIt.render(`
${demo}
`)
    ).toMatchSnapshot();

    expect(
      markdownIt.render(`
\`\`\`md
${demo}
\`\`\`
`)
    ).toMatchSnapshot();
  });

  it("Should handle preset", () => {
    const flowRenderResult = markdownIt.render(`
\`\`\`flow:ant
${demo}
\`\`\`
`);

    expect(flowRenderResult).toMatch(
      /<FlowChart id="flowchart-.*?" code=".*?" preset="ant"><\/FlowChart>/
    );
    expect(flowRenderResult).toMatchSnapshot();

    const flowChartRenderResult = markdownIt.render(`
\`\`\`flowchart:ant
${demo}
\`\`\`
`);

    expect(flowChartRenderResult).toMatch(
      /<FlowChart id="flowchart-.*?" code=".*?" preset="ant"><\/FlowChart>/
    );
    expect(flowChartRenderResult).toMatchSnapshot();
  });
});
