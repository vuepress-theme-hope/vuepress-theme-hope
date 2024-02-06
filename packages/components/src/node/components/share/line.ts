import type { ShareServiceConfig } from "../../../shared/index.js";

export const line: ShareServiceConfig = {
  link: "https://line.me/R/msg/text/?[title]%0D%0A[url]%0D%0A[description|summary]",
  color: "#00C300",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M962 447c0-201-203-365-450-365S62 246 62 447c0 178 160 332 377 363 14 3 34 10 39 22a91 91 0 0 1 0 41l-7 38c0 11-9 45 39 25a1422 1422 0 0 0 354-261c60-59 95-140 96-225zM336 567h-89c-13 0-23-10-23-23V365a23 23 0 0 1 23-24c13 0 23 11 23 24v154h66c13 1 23 12 23 25s-11 23-23 23m93-23a23 23 0 0 1-47 0V365a23 23 0 0 1 47 0zm215 0c0 10-7 19-16 22h-8a23 23 0 0 1-18-9l-90-124v111a23 23 0 0 1-47 0V365c0-11 6-20 16-23h8a23 23 0 0 1 18 9l92 124V364a23 23 0 0 1 47 0zm144-113a23 23 0 1 1 0 46h-65v42h65c13 1 24 11 23 24 0 13-10 23-23 23h-91c-12 0-23-10-23-23V364c0-13 10-23 23-23h89c13 0 24 10 24 23a23 23 0 0 1-24 24h-63v42z"/></svg>',
};
