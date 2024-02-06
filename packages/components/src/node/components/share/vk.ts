import type { ShareServiceConfig } from "../../../shared/index.js";

export const vk: ShareServiceConfig = {
  link: "https://vk.com/share.php?url=[url]&title=[title]&description=[description]&image=[cover|image]&noparse=true",
  color: "#07F",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M62 252c8 351 192 562 495 562h18V612c111 12 194 94 228 201h159a447 447 0 0 0-225-282c69-42 168-143 192-281H784c-32 113-122 213-209 224V252H428v388c-90-22-207-132-211-388z"/></svg>',
};
