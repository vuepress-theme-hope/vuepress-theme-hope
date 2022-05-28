import { release } from "./release.js";

release().catch((err) => {
  console.error(err);
  process.exit(1);
});
