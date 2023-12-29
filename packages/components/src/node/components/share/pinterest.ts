import type { ShareServiceConfig } from "../../../shared/index.js";

export const pinterest: ShareServiceConfig = {
  link: "https://pinterest.com/pin/create/button/?description=[title]&media=[cover|image]&url=[url]",
  color: "#CA242D",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M157 385c0 89 34 168 108 198 12 4 23 0 26-13l11-42c4-13 2-17-8-29-21-24-34-56-34-101 0-131 99-248 259-248 142 0 219 85 219 198 0 149-67 275-167 275-55 0-96-45-83-99 16-66 47-137 47-184 0-42-24-78-71-78-57 0-102 58-102 134 0 49 17 82 17 82l-68 282c-20 84-3 186-1 196 0 6 8 8 12 3 5-6 72-88 95-169l37-142c18 34 72 65 129 65 169 0 284-152 284-355 0-153-132-296-333-296-251 0-377 176-377 323"/></svg>',
};
