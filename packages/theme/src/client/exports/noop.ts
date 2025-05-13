declare const __VP_CUSTOM__: boolean;

if (__VP_CUSTOM__)
  throw new Error(`\
VuePress Theme is running in  bundle mode, this import is not allowed.
`);

export {};
