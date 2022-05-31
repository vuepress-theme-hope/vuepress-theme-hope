import {
  PlaygroundFiles,
  PlaygroundExternalOptions,
} from "../../../shared/playground";
import { utoa } from "../../utils/playground";

interface SourceConfig {
  [key: string]: string | undefined;
}

export const usePlaygroundExternal = (
  config: string,
  options: PlaygroundExternalOptions
) => {
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
