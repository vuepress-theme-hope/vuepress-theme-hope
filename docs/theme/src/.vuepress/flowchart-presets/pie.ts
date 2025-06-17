import base from "./base.js";

export default {
  ...base,

  // Style symbol types
  "line-width": 1,
  symbols: {
    start: {
      class: "start-element",
      fill: "#ccc",
      "line-color": "#5c6ac4",
      "font-color": "#000",
    },
    end: {
      class: "end-element",
      fill: "#ccc",
      "line-color": "#5c6ac4",
      "font-color": "#000",
    },
    operation: {
      class: "operation-element",
      fill: "#f1f1f1",
      "line-color": "#5c6ac4",
      "font-color": "#000",
    },
    inputoutput: {
      class: "inputoutput-element",
      fill: "#f1f1f1",
      "line-color": "#5c6ac4",
      "font-color": "#000",
    },
    subroutine: {
      class: "subroutine-element",
      fill: "#f1f1f1",
      "line-color": "#5c6ac4",
      "font-color": "#000",
    },
    condition: {
      class: "condition-element",
      fill: "#f1f1f1",
      "line-color": "#5c6ac4",
      "font-color": "#000",
    },
    parallel: {
      class: "parallel-element",
      fill: "#f1f1f1",
      "line-color": "#5c6ac4",
      "font-color": "#000",
    },
  },
};
