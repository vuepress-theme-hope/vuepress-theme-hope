import { defineComponent } from "vue";

export default defineComponent({
  name: "NoopModule",
  setup() {
    return (): null => null;
  },
});
