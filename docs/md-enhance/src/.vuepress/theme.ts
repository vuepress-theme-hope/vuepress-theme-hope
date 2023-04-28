import { theme } from "docs-shared";
import { enNavbarConfig, zhNavbarConfig } from "./navbar.js";
import { enSidebarConfig, zhSidebarConfig } from "./sidebar.js";
import { getDirname, path } from "docs-shared";

const __dirname = getDirname(import.meta.url);

export default theme("md-enhance", {
  locales: {
    "/": {
      navbar: enNavbarConfig,
      sidebar: enSidebarConfig,
    },

    "/zh/": {
      navbar: zhNavbarConfig,
      sidebar: zhSidebarConfig,
    },
  },

  plugins: {
    mdEnhance: {
      align: true,
      attrs: true,
      card: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgMark: true,
      imgSize: true,
      include: {
        resolvePath: (file, cwd) => {
          if (file.startsWith("@echarts"))
            return file.replace(
              "@echarts",
              path.resolve(__dirname, "../echarts")
            );

          return file;
        },
      },
      mathjax: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
  },
});
