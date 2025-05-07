declare const __IS_BUNDLED__: boolean | undefined;
declare const __VP_CUSTOM__: boolean;

if (typeof __IS_BUNDLED__ === "boolean" && __VP_CUSTOM__ === __IS_BUNDLED__)
  throw new Error(`\
VuePress Theme is running in  ${__VP_CUSTOM__ ? "custom" : "bundle"} mode, this import is not allowed. \
Check Documentation for more details.\
`);
