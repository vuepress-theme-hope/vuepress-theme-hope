// Developer beware: this file is symlinked between components/ and theme/

import { defineComponent, h,  } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { VNode } from "vue";

import "../styles/tag.scss";

// TODO: Right now the magic number 9 is baked in
// That's because access to the theme config is
// tricky in non-theme components.
//
function colorIndex(name: string) {
  let hash = 1
  
  for (let i = 0; i < name.length; i++) {  // Jenkins one-at-a-time
        hash += name.charCodeAt(i)
        hash += (hash << 10)
        hash ^= (hash >> 6)
    }
    hash += (hash << 3);
    hash ^= (hash >> 11);
    return hash % 9
}


export default defineComponent({
  name: "Tag",

  props: {
    name: {
      type: String
    },

    path: {
      type: String,
    },

    highlightCurrent: {
      type: Boolean,
      default: false
    },

    color: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();


    const navigate = (path = ""): void => {
      if (path && route.path !== path) void router.push(path);
    };

    return (): VNode | null => 
    h("span",
      {
        class: [
          "tag",
          {
            [`tag${colorIndex(props.name || "dummy")}`]: props.color,
            clickable: props.path,
            active: props.highlightCurrent,
          },
        ],
        role: props.path ? "navigation" : "",
        onClick: () => navigate(props.path),
      },
        props.name
     )
  },
});

