import type {
  GiscusInputPosition,
  GiscusMapping,
  GiscusRepo,
} from "../../shared/index.js";

type BooleanString = "0" | "1";

export type GiscusTheme =
  | "light"
  | "light_high_contrast"
  | "light_protanopia"
  | "dark"
  | "dark_high_contrast"
  | "dark_protanopia"
  | "dark_dimmed"
  | "transparent_dark"
  | "preferred_color_scheme"
  | `https://${string}`;

export type GiscusLang =
  | "de"
  | "gsw"
  | "en"
  | "es"
  | "fr"
  | "id"
  | "it"
  | "ja"
  | "ko"
  | "pl"
  | "ro"
  | "ru"
  | "tr"
  | "vi"
  | "zh-CN"
  | "zh-TW";

export type GiscusLoading = "lazy" | "eager";

export interface GiscusProps {
  id?: string | undefined;
  repo: GiscusRepo;
  repoId: string;
  category?: string | undefined;
  categoryId?: string | undefined;
  mapping: GiscusMapping;
  term?: string | undefined;
  theme?: GiscusTheme | undefined;
  reactionsEnabled?: BooleanString | undefined;
  strict?: BooleanString | undefined;
  emitMetadata?: BooleanString | undefined;
  inputPosition?: GiscusInputPosition | undefined;
  lang?: GiscusLang | undefined;
  loading?: GiscusLoading | undefined;
}
