<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <!-- Background of PhotoSwipe. 
    It’s a separate element, as animating opacity is faster than rgba().-->
    <div class="pswp__bg" />

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->
      <div class="pswp__container">
        <!-- don’t modify these 3 pswp__item elements, data is added later on -->
        <div class="pswp__item" />
        <div class="pswp__item" />
        <div class="pswp__item" />
      </div>

      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <!--  Controls are self-explanatory. Order can be changed. -->

          <div class="pswp__counter" />

          <button
            class="pswp__button pswp__button--close"
            :title="locale.close"
          />

          <button
            class="pswp__button pswp__button--share"
            :title="locale.share"
          />

          <button
            class="pswp__button pswp__button--fs"
            :title="locale.fullscreen"
          />

          <button
            class="pswp__button pswp__button--zoom"
            :title="locale.zoom"
          />

          <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut" />
              </div>
            </div>
          </div>
        </div>

        <div
          class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"
        >
          <div class="pswp__share-tooltip" />
        </div>

        <button
          class="pswp__button pswp__button--arrow--left"
          :title="locale.prev"
        />

        <button
          class="pswp__button pswp__button--arrow--right"
          :title="locale.next"
        />

        <div class="pswp__caption">
          <div class="pswp__caption__center" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useLocaleConfig } from "@mr-hope/vuepress-shared/lib/client";
import { defineComponent, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { delay, imageSelector, locales, options } from "../define";
import { getImages } from "../utils";

import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";

export default defineComponent({
  name: "PhotoSwipe",

  setup() {
    const route = useRoute();
    const locale = useLocaleConfig(locales);

    const initPhotoSwipe = (): void => {
      const pswp = document.querySelector(".pswp") as HTMLElement;

      void Promise.all([
        import(/* webpackChunkName: "photo-swipe" */ "photoswipe"),
        import(
          /* webpackChunkName: "photo-swipe" */ "photoswipe/dist/photoswipe-ui-default"
        ),
        new Promise<void>((resolve) => setTimeout(resolve, delay)).then(() =>
          getImages(imageSelector)
        ),
      ]).then(([photoSwipe, photoSwipeUIDefault, images]) => {
        images.elements.forEach((image, index) => {
          image.addEventListener("click", (): void => {
            const gallery = new photoSwipe.default(
              pswp,
              photoSwipeUIDefault.default,
              images.infos,
              {
                shareButtons: locale.value.buttons,
                ...options,
                index,
              }
            );
            gallery.init();
          });
        });
      });
    };

    watch(
      () => route.path,
      () => initPhotoSwipe()
    );

    onMounted(() => initPhotoSwipe());

    return { locale };
  },
});
</script>
