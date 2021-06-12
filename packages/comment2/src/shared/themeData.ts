import { ThemeData } from "@vuepress/plugin-theme-data";
import { CommentOptions } from "./options";
export interface CommentPluginThemeData extends ThemeData {
  plugins?: {
    comment?: CommentOptions | false;
  };
}
