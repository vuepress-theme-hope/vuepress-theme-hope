import type { ShareServiceConfig } from "../../../shared/index.js";

export const facebook: ShareServiceConfig = {
  link: "https://www.facebook.com/sharer/sharer.php?u=[url]&title=[title]&description=[description]&quote=[summary]&hashtag=[tags]",
  color: "#3c599b",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M295 360h93v-91c0-40 1-101 30-139 30-41 72-68 144-68 118 0 168 17 168 17l-24 138s-39-12-75-12-69 13-69 50v105h149l-10 134H562v468H388V494h-93z"/></svg>',
};
