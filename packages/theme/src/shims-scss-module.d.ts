declare module "*.module.scss?module" {
  export const mobileBreakPoint: string;
  export const pcBreakPoint: string;
  export const enableThemeColor: "true" | "false";
  export const themeColors: string;
  export const colorNumber: `${number}`;
}
