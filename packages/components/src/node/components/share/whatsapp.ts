import type { ShareServiceConfig } from "../../../shared/index.js";

export const whatsapp: ShareServiceConfig = {
  link: "https://api.whatsapp.com/send?text=[title]%0D%0A[url]%0D%0A[description|summary]",
  color: "#31B84C",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="m62 962 64-231a444 444 0 0 1-60-223 448 448 0 0 1 765-315 442 442 0 0 1 131 315c0 246-201 446-448 446a449 449 0 0 1-214-54zm340-640c-9-22-18-19-25-20h-22a41 41 0 0 0-30 14c-10 11-39 38-39 93s40 108 46 115c6 8 79 120 191 168 27 12 48 19 64 24 27 8 51 7 71 4 21-3 66-27 75-53s9-48 7-53c-3-4-11-7-22-13l-76-36c-11-4-18-5-26 6-7 11-28 36-35 43-6 8-13 9-24 3-11-5-47-17-90-55-34-30-56-66-63-77-6-12 0-18 5-23l17-20c6-6 8-11 11-18 4-8 2-14-1-20l-34-83z"/></svg>',
};
