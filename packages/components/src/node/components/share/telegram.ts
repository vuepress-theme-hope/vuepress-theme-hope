import type { ShareServiceConfig } from "../../../shared/index.js";

export const telegram: ShareServiceConfig = {
  link: "https://t.me/share/url?url=[url]&text=[title]%0D%0A[description|summary]",
  color: "#158cc7",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="m413 807 13-187 340-307c15-14-3-21-23-8L323 570l-183-58c-39-11-39-38 9-57l709-274c33-14 64 8 51 58L788 807c-8 40-33 50-66 31L538 703l-88 85c-10 10-19 19-37 19"/></svg>',
};
