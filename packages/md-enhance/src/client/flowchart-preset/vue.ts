import base from "./base";

export default {
  ...base,

  // style symbol types
  symbols: {
    start: {
      class: "start-element",
      "font-color": "#fff",
      fill: "#2F495F",
      "line-width": "0px",
    },
    end: {
      class: "end-element",
      "font-color": "#fff",
      fill: "#2F495F",
      "line-width": "0px",
    },
    operation: {
      class: "operation-element",
      "font-color": "#fff",
      fill: "#00BC7D",
      "line-width": "0px",
    },
    inputoutput: {
      class: "inputoutput-element",
      "font-color": "#fff",
      fill: "#EB4D5D",
      "line-width": "0px",
    },
    subroutine: {
      class: "subroutine-element",
      "font-color": "#fff",
      fill: "#937AC4",
      "element-color": "#fff",
      "line-color": "red",
    },
    condition: {
      class: "condition-element",
      "font-color": "#fff",
      fill: "#FFB500",
      "line-width": "0px",
    },
    parallel: {
      class: "parallel-element",
      "font-color": "#fff",
      fill: "#2F495F",
      "line-width": "0px",
    },
  },
};
