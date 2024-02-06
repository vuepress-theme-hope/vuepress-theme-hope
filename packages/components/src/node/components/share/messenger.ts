import type { ShareServiceConfig } from "../../../shared/index.js";

export const messenger: ShareServiceConfig = {
  link: "fb-messenger://share/?link=[url]",
  color: "#0183FF",
  action: "open",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M512 62C266 62 68 248 68 478c0 121 56 235 155 315v169l165-87c42 12 82 15 124 15 246 0 444-184 444-414 0-228-198-414-444-414m45 552L445 494 236 613l231-246 114 114 204-114z"/></svg>',
};
