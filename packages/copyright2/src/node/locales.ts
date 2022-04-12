import type { CopyrightLocaleConfig } from "../shared";

/** Muti language config for copyright */
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

  "/pl/": {
    author: "Prawa autorskie :author",
    license: "Licencja :license",
    link: ":link",
  },
};
