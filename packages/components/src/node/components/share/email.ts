import type { ShareServiceConfig } from "../../../shared/index.js";

export const email: ShareServiceConfig = {
  link: "mailto:?subject=[title]&body=[url]%0D%0A%0D%0A[description|summary]",
  color: "#1384FF",
  action: "open",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M146.375 174.5C99.793 174.5 62 212.293 62 258.875c0 26.543 12.48 51.504 33.75 67.5l382.5 286.875c20.04 14.941 47.46 14.941 67.5 0l382.5-286.875c21.27-15.996 33.75-40.957 33.75-67.5 0-46.582-37.793-84.375-84.375-84.375h-731.25zM62 371.375V737c0 62.05 50.45 112.5 112.5 112.5h675c62.05 0 112.5-50.45 112.5-112.5V371.375L579.5 658.25a112.324 112.324 0 0 1-135 0L62 371.375z"/></svg>',
};
