import { type RedirectLocaleConfig } from "../shared/index.js";

/** Multi language config for redirect popup */
export const redirectLocales: RedirectLocaleConfig = {
  "/en/": {
    hint: "Your primary language is $1, do you want to switch to it?",
    switch: "Switch",
    cancel: "Cancel",
  },
};
