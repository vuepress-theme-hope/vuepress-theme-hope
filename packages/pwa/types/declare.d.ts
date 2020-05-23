declare module "workbox-build" {
  interface WorkboxBuild {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generateSW: (options: any) => Promise<void>;
  }

  const workboxBuild: WorkboxBuild;

  export = workboxBuild;
}
