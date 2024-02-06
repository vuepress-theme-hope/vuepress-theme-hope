import type { ShareServiceConfig } from "../../../shared/index.js";

export const twitter: ShareServiceConfig = {
  link: "https://twitter.com/intent/tweet?text=[title]&url=[url]&hashtags=[tags][title][twitter-user]",
  color: "#000",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="m587 451 291-339h-69L555 407 354 112H120l305 446-305 354h68l268-310 213 310h235zM214 163h107l488 699H702z"/></svg>',
};
