import type { ShareServiceConfig } from "../../../shared/index.js";

export const tumblr: ShareServiceConfig = {
  link: "https://www.tumblr.com/share/link?url=[url]&name=[title]&description=[description]",
  color: "#001935",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M787 912V767c-47 32-92 44-139 44-21 0-40-3-66-16-17-12-26-19-29-37-9-12-13-45-13-99V431h209V294H540V62H415c-8 54-20 91-29 115-12 30-33 54-62 80-30 21-58 37-87 49v125h95v315c0 32 4 65 17 91a213 213 0 0 0 120 108 389 389 0 0 0 213 4c34-9 70-21 105-37"/></svg>',
};
