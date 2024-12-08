import { ensureLeadingSlash } from "@vuepress/helper/client";
import type { FunctionalComponent, PropType } from "vue";
import { h } from "vue";

declare const IS_NETLIFY: boolean;
declare const IS_GITEE: boolean;

export interface ProjectLinkProps {
  type?: "plugin" | "theme";
  name: string;
  path?: string;
}

const ProjectLink: FunctionalComponent<
  ProjectLinkProps,
  Record<never, never>,
  { default: () => string }
> = ({ name, type = "plugin", path = "/" }, { slots }) => {
  const base = name === "hope" ? "" : `/${name.replace(/\d+$/, "")}`;

  return h(
    "a",
    {
      href: `https://${
        IS_NETLIFY
          ? `${type}-${name}.vuejs.press${ensureLeadingSlash(path)}`
          : `vuepress-theme-hope.${
              IS_GITEE ? "gitee" : "github"
            }.io/v2${base}${ensureLeadingSlash(path)}`
      }`,
      target: "_blank",
    },
    slots.default(),
  );
};

ProjectLink.displayName = "ProjectLink";

ProjectLink.props = {
  /**
   * Plugin type
   */
  type: {
    type: String as PropType<"plugin" | "theme">,
    default: "plugin",
  },

  /**
   * Plugin name
   */
  name: {
    type: String,
    required: true,
  },

  /**
   * Link pathname
   */
  path: {
    type: String,
    default: "/",
  },
};

export default ProjectLink;
