import "./styles/code-demo.styl";

import { initDemo } from "./demo";

export default {
  mounted(): void {
    setTimeout(() => {
      void initDemo();
    }, 1000);
  },

  updated(): void {
    setTimeout(() => {
      void initDemo();
    }, 1000);
  },
};
