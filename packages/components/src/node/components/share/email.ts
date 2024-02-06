import type { ShareServiceConfig } from "../../../shared/index.js";

export const email: ShareServiceConfig = {
  link: "mailto:?subject=[title]&body=[url]%0D%0A%0D%0A[description|summary]",
  color: "#1384FF",
  action: "open",
  shape:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M152 177h720c49 0 89 37 90 83L512 494 63 260c0-46 40-83 89-83M62 349v414c0 46 41 84 90 84h720c49 0 90-38 90-84V349L523 572a24 24 0 0 1-22 0z"/></svg>',
};
