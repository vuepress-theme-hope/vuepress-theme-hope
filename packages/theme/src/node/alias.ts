import { path } from "@vuepress/utils";

export const getAlias = (): Record<string, string> => {
  // use alias to make all components replaceable
  // alias: Object.fromEntries(
  //   fs
  //     .readdirSync(path.resolve(__dirname, "../client/components"))
  //     .filter((file) => file.endsWith(".vue"))
  //     .map((file) => [
  //       `@theme/${file}`,
  //       path.resolve(__dirname, "../client/components", file),
  //     ])
  // ),

  return {
    "@CommonWrapper": path.resolve(
      __dirname,
      "../client/components/CommonWrapper.js"
    ),
    "@Navbar": path.resolve(__dirname, "../client/components/navbar/Navbar.js"),
    "@Sidebar": path.resolve(
      __dirname,
      "../client/components/sidebar/Sidebar.js"
    ),
  };
};
