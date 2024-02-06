import MarkdownIt from "markdown-it";
import { describe, expect, it } from "vitest";

import { echarts } from "../../src/node/markdown-it/echarts.js";

describe("echarts", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(echarts);

  it("Should resolve echarts container with json block", () => {
    const result = markdownIt.render(
      `
::: echarts A line chart

\`\`\`json
{
  'xAxis': {
    'type': 'category',
    'data': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  'yAxis': {
    'type': 'value'
  },
  'series': [
    {
      'data': [150, 230, 224, 218, 135, 147, 260],
      'type': 'line'
    }
  ]
}
\`\`\`

:::
`,
      {},
    );

    expect(result).toMatch(/<ECharts.*><\/ECharts>/);
    expect(result).toContain(`title="${encodeURIComponent("A line chart")}"`);
    expect(result).not.toContain('type=""');
    expect(result).toMatchSnapshot();
  });

  it("Should resolve echarts container with js block", () => {
    const result = markdownIt.render(
      `
::: echarts A line chart

\`\`\`js
const option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
};
\`\`\`

:::
`,
      {},
    );

    expect(result).toMatch(/<ECharts.*><\/ECharts>/);
    expect(result).toContain(`title="${encodeURIComponent("A line chart")}"`);
    expect(result).toContain('type="js"');
    expect(result).toMatchSnapshot();
  });

  it("Should resolve echarts container with javascript block", () => {
    const result = markdownIt.render(
      `
::: echarts A line chart

\`\`\`javascript
const option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
};
\`\`\`

:::
`,
      {},
    );

    expect(result).toMatch(/<ECharts.*><\/ECharts>/);
    expect(result).toContain(`title="${encodeURIComponent("A line chart")}"`);
    expect(result).toContain('type="js"');
    expect(result).toMatchSnapshot();
  });

  it("Should resolve echarts container with empty title and body", () => {
    const result = markdownIt.render(
      `
::: echarts

:::
`,
      {},
    );

    expect(result).toMatch(/<ECharts.*><\/ECharts>/);
    expect(result).not.toContain('title="');
    expect(result).not.toContain('type=""');
    expect(result).toMatchSnapshot();
  });

  it("Should resolve echarts fence", () => {
    const result = markdownIt.render(
      `
\`\`\`echarts:A line chart
{
  'xAxis': {
    'type': 'category',
    'data': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  'yAxis': {
    'type': 'value'
  },
  'series': [
    {
      'data': [150, 230, 224, 218, 135, 147, 260],
      'type': 'line'
    }
  ]
}
\`\`\`
`,
      {},
    );

    expect(result).toMatch(/<ECharts.*><\/ECharts>/);
    expect(result).toContain(`title="${encodeURIComponent("A line chart")}"`);
    expect(result).not.toContain('type=""');
    expect(result).toMatchSnapshot();
  });

  it("Should resolve echarts fence with empty title and body", () => {
    const result = markdownIt.render(
      `
\`\`\`echarts
\`\`\`
`,
      {},
    );

    expect(result).toMatch(/<ECharts.*><\/ECharts>/);
    expect(result).not.toContain('title="');
    expect(result).not.toContain('type=""');
    expect(result).toMatchSnapshot();
  });

  it("Should not break markdown fence", () => {
    const result = markdownIt.render(
      `
\`\`\`js
const a = 1;
\`\`\`
`,
      {},
    );

    expect(result).toMatch(/<pre.*>[\s\S]*<\/pre>/);
    expect(result).toMatchSnapshot();
  });
});
