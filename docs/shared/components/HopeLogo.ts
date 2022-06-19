import { usePageFrontmatter, withBase } from "@vuepress/client";
import { defineComponent, h, onMounted, ref } from "vue";

import type { Mesh } from "three";
import type { VNode } from "vue";
import type { HopeThemeProjectHomePageFrontmatter } from "vuepress-theme-hope";

import "./hope-logo.scss";

export default defineComponent({
  name: "HopeLogo",

  setup() {
    const ready = ref(false);

    const frontmatter =
      usePageFrontmatter<HopeThemeProjectHomePageFrontmatter>();

    onMounted(() =>
      Promise.all([
        import("three" /* webpackChunkName: "hope-logo" */).then(
          (m) => m.default || m
        ),
        import(
          "three/examples/jsm/controls/OrbitControls" /* webpackChunkName: "hope-logo" */
        ).then((m) => m.default || m),
        import(
          "three/examples/jsm/loaders/STLLoader" /* webpackChunkName: "hope-logo" */
        ).then((m) => m.default || m),
      ]).then(([THREE, { OrbitControls }, { STLLoader }]) => {
        // Settings
        const sizes = {
          width: 300,
          height: 300,
        };
        // Canvas
        const canvas =
          document.querySelector<HTMLCanvasElement>("canvas#hero-logo")!;
        // Scene
        const scene = new THREE.Scene();
        const stlLoader = new STLLoader();
        const textureLoader = new THREE.TextureLoader();
        const roughnessTexture = textureLoader.load(
          withBase("/assets/model/roughness.jpeg")
        );
        // Models
        let logo1: Mesh;
        let logo2: Mesh;

        void Promise.all([
          new Promise<void>((resolve) =>
            stlLoader.load(withBase("/assets/model/logo1.stl"), (geometry) => {
              const material = new THREE.MeshPhysicalMaterial({
                color: 0x284c39,
                metalness: 0.45,
                roughness: 0.5,
                roughnessMap: roughnessTexture,
                displacementScale: 0.15,
                emissiveIntensity: 0.4,
                reflectivity: 1,
              });

              logo1 = new THREE.Mesh(geometry, material);
              logo1.castShadow = true;
              logo1.receiveShadow = true;
              logo1.rotation.z = 0;
              logo1.scale.set(0.3, 0.3, 0.3);

              scene.add(logo1);

              resolve();
            })
          ),
          new Promise<void>((resolve) =>
            stlLoader.load(withBase("/assets/model/logo2.stl"), (geometry) => {
              const material = new THREE.MeshPhysicalMaterial({
                color: 0x35495e,
                metalness: 0.7,
                roughness: 0.5,
                roughnessMap: roughnessTexture,
                displacementScale: 0.15,
                emissiveIntensity: 0.4,
                reflectivity: 1,
              });

              logo2 = new THREE.Mesh(geometry, material);
              logo2.castShadow = true;
              logo2.receiveShadow = true;
              logo2.rotation.z = 0;
              logo2.scale.set(0.3, 0.3, 0.3);

              scene.add(logo2);

              resolve();
            })
          ),
        ]).then(() => {
          ready.value = true;
        });

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3);

        directionalLight.position.set(3, 3, 3);
        directionalLight2.position.set(-3, -3, -3);

        scene.add(ambientLight);
        scene.add(directionalLight);
        scene.add(directionalLight2);

        // Base camera
        const camera = new THREE.PerspectiveCamera(
          45,
          sizes.width / sizes.height,
          1,
          2000
        );

        camera.position.set(0, 0, 20);
        scene.add(camera);

        // Controls
        const controls = new OrbitControls(camera, canvas);

        controls.enableZoom = false;
        controls.target.set(0, 0.75, 0);
        controls.enableDamping = true;
        controls.enablePan = false;
        // Lock Y Axis
        controls.minPolarAngle = Math.PI / 2;
        controls.maxPolarAngle = Math.PI / 2;

        // Render
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          canvas,
        });

        renderer.setClearColor(0x000000, 0);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Animations
        const clock = new THREE.Clock();

        const tick = (): void => {
          const elapsedTime = clock.getElapsedTime();

          if (logo1 && logo2) {
            logo1.rotation.y = 0.5 * elapsedTime;
            logo2.rotation.y = 0.5 * elapsedTime;
          }

          // Update controls
          controls.update();
          // Render
          renderer.render(scene, camera);
          // Call tick again on the next frame
          window.requestAnimationFrame(tick);
        };

        tick();
      })
    );

    return (): (VNode | null)[] => [
      !ready.value
        ? h("img", {
            src: withBase(frontmatter.value.heroImage!),
            alt: "vuepress-theme-hope",
          })
        : null,

      h("canvas", {
        id: "hero-logo",
        style: {
          display: ready.value ? "block" : "none",
          opacity: ready.value ? 1 : 0,
        },
      }),
    ];
  },
});
