import base from "./base";

export default {
  ...base,

  // style symbol types
  symbols: {
    start: {
      class: "start-element",
      "font-color": "#fff",
      fill: "#595959",
      "line-width": "0px",
    },
    end: {
      class: "end-element",
      "font-color": "#fff",
      fill: "#595959",
      "line-width": "0px",
    },
    operation: {
      class: "operation-element",
      "font-color": "#fff",
      fill: "#1890ff",
      "line-width": "0px",
    },
    inputoutput: {
      class: "inputoutput-element",
      "font-color": "#fff",
      fill: "#1890ff",
      "line-width": "0px",
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
      "line-width": "0px",
    },
    parallel: {
      class: "parallel-element",
      "font-color": "#fff",
      fill: "#1890ff",
      "line-width": "0px",
    },
  },
};
