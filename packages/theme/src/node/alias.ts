import { path } from "@vuepress/utils";

export const getAlisa = (): Record<string, string> => {
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
