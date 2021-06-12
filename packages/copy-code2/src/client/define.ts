import type { CopyCodeOptions, CopyCodeLocaleConfig } from "../shared";

declare const CODE_COPY_OPIONS: Required<CopyCodeOptions>;
declare const CODE_COPY_I18N: CopyCodeLocaleConfig;

export const i18n = CODE_COPY_I18N;
export const options = CODE_COPY_OPIONS;
