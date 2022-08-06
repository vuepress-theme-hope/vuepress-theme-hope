import { utoa } from "../utils/playground";

import type {
  PlaygroundFiles,
  ExternalPlaygroundOptions,
} from "../../shared/playground";

type SourceConfig = Record<string, string | undefined>;

export const useExternalPlayground = (
  config: string,
  options: ExternalPlaygroundOptions
): {
  encoded: string;
  link: string;
} => {
  const configObj = JSON.parse(decodeURIComponent(config)) as PlaygroundFiles;

  const sourceConfig: SourceConfig = {};

  for (const key in configObj) {
    // eslint-disable-next-line no-prototype-builtins
    if (configObj.hasOwnProperty(key)) {
      sourceConfig[key] = configObj[key].content;
    }
  }

  const encoded = utoa(JSON.stringify(sourceConfig));

  const { base, options: _options } = options;
  const baseUrl = base!.replace(/\/+$/g, "");

  let optionString;

  if (_options) {
    optionString = new URLSearchParams(_options).toString();
  }

  const link = optionString
    ? `${baseUrl}?${optionString}#${encoded}`
    : `${baseUrl}#${encoded}`;

  return {
    encoded,
    link,
  };
};
