import base from "./base.js";

export default {
  ...base,

  // Style symbol types
  symbols: {
    start: {
      class: "start-element",
      "font-color": "#fff",
      fill: "#595959",
      "line-width": 0,
    },
    end: {
      class: "end-element",
      "font-color": "#fff",
      fill: "#595959",
      "line-width": 0,
    },
    operation: {
      class: "operation-element",
      "font-color": "#fff",
      fill: "#1890ff",
      "line-width": 0,
    },
    inputoutput: {
      class: "inputoutput-element",
      "font-color": "#fff",
      fill: "#1890ff",
      "line-width": 0,
    },
    subroutine: {
      class: "subroutine-element",
      "font-color": "#fff",
      fill: "#FF485E",
      "element-color": "#fff",
      "line-color": "red",
    },
    condition: {
      class: "condition-element",
      "font-color": "#fff",
      fill: "#FF485E",
      "line-width": 0,
    },
    parallel: {
      class: "parallel-element",
      "font-color": "#fff",
      fill: "#1890ff",
      "line-width": 0,
    },
  },
};
