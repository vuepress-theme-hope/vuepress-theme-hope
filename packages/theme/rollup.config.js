import { fs, path } from "@vuepress/utils";
import { rollupTypescript, rollupVue } from "../../scripts/rollup";

const deepReadDir = (base, dir = "") => {
  const dirPath = path.resolve(base, dir);
  const files = fs.readdirSync(dirPath);

  return files
    .map((file) =>
      fs.statSync(path.join(dirPath, file)).isDirectory()
        ? deepReadDir(base, path.join(dir, file))
        : [`${dir ? `${dir}/` : ""}${file}`]
    )
    .flat();
};

const commonExternals = [
  /^@theme-hope\//,
  "@mr-hope/vuepress-shared/lib/client",
  "@vuepress/client",
  "@vuepress/plugin-external-link-icon/lib/client",
  "@vuepress/shared",
  "lodash.throttle",
  "vue",
  "vue-router",
  /\.jpg$/,
  /\.scss$/,
  /\.vue$/,
];

export default [
  ...rollupTypescript("node/index", {
    external: [
      "@mr-hope/vuepress-shared",
      "@mr-hope/vuepress-plugin-components",
      "bcryptjs",
      "@vuepress/utils",
      "vuepress-plugin-blog2",
      "vuepress-plugin-comment2",
      "vuepress-plugin-copy-code2",
      "vuepress-plugin-feed2",
      "vuepress-plugin-md-enhance",
      "vuepress-plugin-photo-swipe",
      "vuepress-plugin-pwa2",
      "vuepress-plugin-reading-time2",
      "vuepress-plugin-sass-palette",
      "vuepress-plugin-seo2",
      "vuepress-plugin-sitemap2",
    ],
  }),

  ...deepReadDir("./src/client/components")
    .map((components) =>
      components.endsWith(".ts")
        ? rollupTypescript(
            `client/components/${components.replace(/\.ts/, "")}`,
            {
              external: commonExternals,
              dtsExternal: commonExternals,
            }
          )
        : rollupVue(`client/components/${components}`, {
            external: commonExternals,
            dtsExternal: commonExternals,
          })
    )
    .flat(),

  ...deepReadDir("./src/client/layouts")
    .map((components) =>
      components.endsWith(".ts")
        ? rollupTypescript(`client/layouts/${components.replace(/\.ts/, "")}`, {
            external: commonExternals,
            dtsExternal: commonExternals,
          })
        : rollupVue(`client/layouts/${components}`, {
            external: commonExternals,
            dtsExternal: commonExternals,
          })
    )
    .flat(),

  ...["composables", "utils"]
    .map((folder) =>
      rollupTypescript(`client/${folder}/index`, {
        external: [
          ...commonExternals,
          "@vueuse/core",
          "@vuepress/plugin-external-link-icon/lib/client",
        ],
        dtsExternal: commonExternals,
      })
    )
    .flat(),

  ...["blog", "encrypt", "navbar", "sidebar"]
    .map((module) => [
      ...deepReadDir(`./src/client/module/${module}/components`)
        .map((components) =>
          components.endsWith(".ts")
            ? rollupTypescript(
                `client/module/${module}/components/${components.replace(
                  /\.ts/,
                  ""
                )}`,
                {
                  external: commonExternals,
                  dtsExternal: commonExternals,
                }
              )
            : rollupVue(`client/module/${module}/components/${components}`, {
                external: commonExternals,
                dtsExternal: commonExternals,
              })
        )
        .flat(),

      ...["composables", "utils"]
        .filter((folder) => fs.existsSync(`./src/client/${module}/${folder}`))
        .map((folder) =>
          rollupTypescript(`client/module/${module}/${folder}/index}`, {
            external: commonExternals,
            dtsExternal: commonExternals,
          })
        )
        .flat(),
    ])
    .flat(),

  ...rollupTypescript("client/composables/index", {
    external: [
      // "@mr-hope/vuepress-shared/lib/client",
      // "@vuepress/client",
      // "@vuepress/plugin-external-link-icon/lib/client",
      "@vuepress/plugin-theme-data/lib/client",
      // "@vuepress/shared",
      // "@vueuse/core",
      // "bcryptjs",
      // "vue",
      // "vue-router",
      // "vuepress-plugin-blog2/lib/client",
      // /\.scss$/,
    ],
  }),

  ...rollupTypescript("client/utils/index", {
    external: [
      // "@mr-hope/vuepress-shared/lib/client",
      // "@vuepress/client",
      // "@vuepress/plugin-external-link-icon/lib/client",
      "@vuepress/plugin-theme-data/lib/client",
      // "@vuepress/shared",
      // "@vueuse/core",
      // "bcryptjs",
      // "vue",
      // "vue-router",
      // "vuepress-plugin-blog2/lib/client",
      // /\.scss$/,
    ],
  }),

  ...rollupTypescript("client/appEnhance", {
    copy: [["client/styles", "client"]],
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "@vuepress/plugin-external-link-icon/lib/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "@vueuse/core",
      "bcryptjs",
      "vue",
      "vue-router",
      "vuepress-plugin-blog2/lib/client",
      /\.scss$/,
    ],
    dtsExternal: [/\.scss$/],
  }),

  ...rollupTypescript("client/appSetup", {
    external: [
      "@mr-hope/vuepress-shared/lib/client",
      "@vuepress/client",
      "@vuepress/plugin-external-link-icon/lib/client",
      "@vuepress/plugin-theme-data/lib/client",
      "@vuepress/shared",
      "@vueuse/core",
      "vue",
      "vue-router",
      "vuepress-plugin-blog2/lib/client",
    ],
  }),
];
