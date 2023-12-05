import { theme } from "docs-shared";
import { enNavbar, zhNavbar } from "./navbar.js";
import { enSidebar, zhSidebar } from "./sidebar.js";

// the theme wrapper is located in <root>/docs-shared/src/theme-wrapper.ts
export default theme("comment2", {
  locales: {
    "/": {
      navbar: enNavbar,
      sidebar: enSidebar,
    },
    "/zh/": {
      navbar: zhNavbar,
      sidebar: zhSidebar,
    },
  },

  plugins: {
    mdEnhance: {
      codetabs: true,
      imgMark: true,
      tabs: true,
    },
  },
});
