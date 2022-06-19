import { computed, defineComponent, h } from "vue";
import type { VNode } from "vue";
import { usePageLang } from "@vuepress/client";

export default defineComponent({
  name: "YouTube",

  props: {
    id: {
      type: String,
      default: "",
    },

    height: {
      type: [String, Number],
      default: 400,
    },

    autoplay: Boolean,
    loop: Boolean,
    showCc: Boolean,
    showAnnotations: Boolean,

    start: {
      type: Number,
      default: undefined,
    },

    end: {
      type: Number,
      default: undefined,
    },

    defaultCcLang: {
      type: String,
      default: "",
    },

    uiLang: {
      type: String,
      default: "",
    },

    listType: {
      type: String,
      default: "",
    },

    list: {
      type: String,
      default: "",
    },

    playlist: {
      type: String,
      default: "",
    },

    disableControls: Boolean,
    disableFullscreen: Boolean,
    disableKeyboard: Boolean,
  },

  setup(props) {
    const lang = usePageLang();
    const coreURL = computed(() =>
      props.id
        ? `${props.id}?`
        : props.listType === "playlist" && props.list
        ? `?listType=playlist&list=${
            props.list.startsWith("PL") ? props.list : `PL${props.list}`
          }&`
        : null
    );

    const params = computed(() => {
      const params = new URLSearchParams();

      if (props.autoplay) params.set("autoplay", "1");
      if (props.loop) params.set("loop", "1");
      if (props.showCc) params.set("cc_load_policy", "1");
      if (props.showAnnotations) params.set("iv_load_policy", "3");

      if (props.start) params.set("start", props.start.toString());
      if (props.end) params.set("end", props.end.toString());

      params.set("hl", props.uiLang || lang.value);
      params.set("cc_lang_pref", props.defaultCcLang || lang.value);
      params.set("color", "white");

      if (props.disableControls) params.set("controls", "0");
      if (props.disableFullscreen) params.set("fs", "0");
      if (props.disableKeyboard) params.set("disablekb", "1");

      if (props.playlist) params.set("playlist", props.playlist);

      return params.toString();
    });

    return (): VNode | null =>
      coreURL.value
        ? h("iframe", {
            src: `https://www.youtube.com/embed/${coreURL.value}${params.value}`,
            class: "youtube-iframe",
            style: {
              width: "100%",
              "border-radius": "8px",
              height:
                typeof props.height === "string"
                  ? props.height
                  : `${props.height}px`,
            },
          })
        : null;
  },
});
