import MarkdownIt from "markdown-it";
import { describe, expect, it } from "vitest";

import { chart } from "../../src/node/markdown-it/index.js";

describe("chart", () => {
  const markdownIt = MarkdownIt({ linkify: true }).use(chart);

  it("Should resolve chart info with json block", () => {
    const result = markdownIt.render(
      `
::: chart A bar chart

\`\`\`json
{
  "type": "bar",
  "data": {
    "labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    "datasets": [
      {
        "label": "# of Votes",
        "data": [12, 19, 3, 5, 2, 3],
        "backgroundColor": [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        "borderColor": [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        "borderWidth": 1
      }
    ]
  },
  "options": {
    "scales": {
      "y": {
        "beginAtZero": true
      }
    }
  }
}
\`\`\`

:::
`,
      {}
    );

    expect(result).toMatch(/<ChartJS.*><\/ChartJS>/);
    expect(result).toContain(`title="${encodeURIComponent("A bar chart")}"`);
    expect(result).toContain('type="json"');
    expect(result).toMatchSnapshot();
  });

  it("Should resolve chart info with js block", () => {
    const result = markdownIt.render(
      `
::: chart A bar chart

\`\`\`js
const config = {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
\`\`\`

:::
`,
      {}
    );

    expect(result).toMatch(/<ChartJS.*><\/ChartJS>/);
    expect(result).toContain(`title="${encodeURIComponent("A bar chart")}"`);
    expect(result).toContain('type="js"');
    expect(result).toMatchSnapshot();
  });

  it("Should resolve chart info with javascript block", () => {
    const result = markdownIt.render(
      `
::: chart A bar chart

\`\`\`javascript
const config = {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
\`\`\`

:::
`,
      {}
    );

    expect(result).toMatch(/<ChartJS.*><\/ChartJS>/);
    expect(result).toContain(`title="${encodeURIComponent("A bar chart")}"`);
    expect(result).toContain('type="js"');
    expect(result).toMatchSnapshot();
  });

  it("Should resolve chart with empty title and body", () => {
    const result = markdownIt.render(
      `
::: chart

:::
`,
      {}
    );

    expect(result).toMatch(/<ChartJS.*><\/ChartJS>/);
    expect(result).not.toContain('title="');
    expect(result).toContain('type=""');
    expect(result).toMatchSnapshot();
  });
});
