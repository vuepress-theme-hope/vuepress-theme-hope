import { defineComponent, h,  } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { VNode } from "vue";

import "../styles/tag.scss";

export default defineComponent({
  name: "Tag",

  props: {
    name: {
      type: String
    },

    path: {
      type: String,
    },

    colorIndex: {
      type: Number,
      default: 0
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
            [`tag${props.colorIndex % 9}`]: props.color,
            clickable: props.path,
          },
        ],
        role: props.path ? "navigation" : "",
        onClick: () => navigate(props.path),
      },
        props.name
     )
  },
});

