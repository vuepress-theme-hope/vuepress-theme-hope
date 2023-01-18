const IS_GITEE = "GITEE" in process.env;
const IS_NETLIFY = "NETLIFY" in process.env;

export const getLinkHelper =
  (localePath = "/"): ((name: string) => string) =>
  (name: string) =>
    IS_NETLIFY
      ? `https://plugin-${name}.vuejs.press${localePath}`
      : `https://vuepress-theme-hope.${
          IS_GITEE ? "gitee" : "github"
        }.io/v2/${name.replace(/\d+$/, "")}${localePath}`;
