import { describe, it, expect } from "vitest";
import MarkdownIt from "markdown-it";
import { echarts } from "../../src/node/markdown-it/echarts";

describe("echarts", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(echarts);

  it("Should resolve echarts info with json block", () => {
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
      {}
    );

    expect(result).toMatch(/<ECharts.*><\/ECharts>/);
    expect(result).toContain(`title="${encodeURIComponent("A line chart")}"`);
    expect(result).toContain('type="json"');
    expect(result).toMatchSnapshot();
  });

  it("Should resolve echarts info with js block", () => {
    const result = markdownIt.render(
      `
::: echarts A line chart

\`\`\`js
module.exports = {
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
      {}
    );

    expect(result).toMatch(/<ECharts.*><\/ECharts>/);
    expect(result).toContain(`title="${encodeURIComponent("A line chart")}"`);
    expect(result).toContain('type="js"');
    expect(result).toMatchSnapshot();
  });

  it("Should resolve echarts info with javascript block", () => {
    const result = markdownIt.render(
      `
::: echarts A line chart

\`\`\`javascript
module.exports = {
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
      {}
    );

    expect(result).toMatch(/<ECharts.*><\/ECharts>/);
    expect(result).toContain(`title="${encodeURIComponent("A line chart")}"`);
    expect(result).toContain('type="js"');
    expect(result).toMatchSnapshot();
  });

  it("Should resolve echarts with empty title and body", () => {
    const result = markdownIt.render(
      `
::: echarts

:::
`,
      {}
    );

    expect(result).toMatch(/<ECharts.*><\/ECharts>/);
    expect(result).not.toContain('title="');
    expect(result).toContain('type=""');
    expect(result).toMatchSnapshot();
  });
});
