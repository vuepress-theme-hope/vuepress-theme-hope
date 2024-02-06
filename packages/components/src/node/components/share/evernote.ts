import type { ShareServiceConfig } from "../../../shared/index.js";

export const evernote: ShareServiceConfig = {
  link: "https://www.evernote.com/clip.action?url=[url]&title=[title]",
  color: "#14cc45",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M300 111v113H187z"/><path d="M872 280s5-100-96-134c0 0-116-16-196-15 0 0-11-69-135-69 0 0-116-2-116 91v80s3 20-36 20H187s-45 7-45 94c0 0 4 156 54 260 0 0 12 45 75 60 0 0 125 33 161 28 0 0 76 29 81-145 0 0 5-25 8 15 0 0-2 90 75 94 0 0 59 17 96 13 0 0 49 3 49 84 0 0 17 93-45 93h-85s-24 5-24-29c0 0-6-28 34-28h20v-57h-56s-86-8-86 65v97s12 65 86 65h158s63 1 99-117c0 0 64-236 30-565M661 491c0-28 23-66 51-66s48 47 48 75c-38-10-60-12-99-9"/></svg>',
};
