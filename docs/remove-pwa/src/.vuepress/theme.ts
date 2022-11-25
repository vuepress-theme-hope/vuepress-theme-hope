import { createRequire } from "node:module";
import { fs, pwa, theme } from "docs-shared";

const { version } = fs.readJsonSync(
  createRequire(import.meta.url).resolve(
    "vuepress-plugin-remove-pwa/package.json"
  )
);

export default theme("remove-pwa", {
  locales: {
    "/": {
      navbar: ["/", "/guide", "/config"],

      sidebar: false,
    },
    "/zh/": {
      navbar: ["/zh/", "/zh/guide", "/zh/config"],

      sidebar: false,
    },
  },

  plugins: {
    mdEnhance: {
      codetabs: true,
      container: true,
    },

    pwa: pwa({
      name: "vuepress-plugin-remove-pwa",
      shortName: "VuePress2 Remove PWA plugin",
    }),
  },
});
