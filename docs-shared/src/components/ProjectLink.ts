import { ensureLeadingSlash } from "@vuepress/shared";
import { type FunctionalComponent, type PropType, h } from "vue";

declare const IS_NETLIFY: boolean;
declare const IS_GITEE: boolean;

export interface ProjectLinkProps {
  type?: "plugin" | "theme";
  name: string;
  path?: string;
}

const ProjectLink: FunctionalComponent<ProjectLinkProps> = (
  props,
  { slots }
) => {
  const path = ensureLeadingSlash(props.path || "/");
  const base =
    props.name === "hope" ? "" : `/${props.name.replace(/\d+$/, "")}`;

  return h(
    "a",
    {
      href: `https://${
        IS_NETLIFY
          ? `${props.type || "plugin"}-${props.name}.vuejs.press${path}`
          : `vuepress-theme-hope.${
              IS_GITEE ? "gitee" : "github"
            }.io/v2${base}${path}`
      }`,
      target: "_blank",
    },
    slots["default"]?.()
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
