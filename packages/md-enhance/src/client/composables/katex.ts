import { onMounted } from "vue";

export const useKatexCopy = (): void => {
  onMounted(
    () =>
      import(
        /* webpackChunkName: "katex" */ "katex/dist/contrib/copy-tex.min.js"
      ),
  );
};
