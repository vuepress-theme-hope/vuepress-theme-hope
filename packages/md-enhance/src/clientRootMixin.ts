import "./styles/code-demo.styl";

import { initDemo } from "./demo";

export default {
  mounted(): void {
    initDemo();
  },

  updated(): void {
    initDemo();
  },
};
