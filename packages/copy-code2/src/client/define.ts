import type { CopyCodeOptions, CopyCodeLocaleConfig } from "../shared";

declare const CODE_COPY_OPIONS: Required<CopyCodeOptions>;
declare const CODE_COPY_LOCALES: CopyCodeLocaleConfig;

export const locales = CODE_COPY_LOCALES;
export const options = CODE_COPY_OPIONS;
