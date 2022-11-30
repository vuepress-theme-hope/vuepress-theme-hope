import { defineComponent } from "vue";

export default defineComponent({
  name: "EmptyComponent",
  setup: () => (): null => null,
});
