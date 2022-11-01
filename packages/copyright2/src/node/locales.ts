import type { CopyrightLocaleConfig } from "../shared/index.js";

/** Multi language config for copyright */
export const copyrightLocales: CopyrightLocaleConfig = {
  "/en/": {
    author: "Copyright by :author",
    license: "License under :license",
    link: ":link",
  },

  "/zh/": {
    author: "著作权归:author所有",
    license: "基于:license协议",
    link: "原文链接：:link",
  },

  "/ru/": {
    author: "Авторские права :author",
    license: "Лицензия :license",
    link: ":link",
  },

  "/pl/": {
    author: "Prawa autorskie :author",
    license: "Licencja :license",
    link: ":link",
  },

  "/sk/": {
    author: "Autorské práva :author",
    license: "Licencia :license",
    link: ":link",
  },

  "/fr/": {
    author: "Copyright par :author",
    license: "Sous licence :license",
    link: ":link",
  },

  "/es/": {
    author: "Derechos de autor :author",
    license: "Licencia :license",
    link: ":link",
  },

  "/ja/": {
    author: "著作権者 :author",
    license: ":licenseプロトコルに基づく",
    link: ":link",
  },
};
