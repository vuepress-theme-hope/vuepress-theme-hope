import { Component, Vue } from "vue-property-decorator";
import AutoIcon from "@mr-hope/vuepress-shared-utils/icons/AutoIcon.vue";
import DarkIcon from "@mr-hope/vuepress-shared-utils/icons/DarkIcon.vue";
import LightIcon from "@mr-hope/vuepress-shared-utils/icons/LightIcon.vue";
import { changeClass } from "@mr-hope/vuepress-shared-utils";

@Component({ components: { AutoIcon, DarkIcon, LightIcon } })
export default class DarkmodeSwitch extends Vue {
  private darkmode: "auto" | "on" | "off" = "auto";

  private get darkmodeConfig(): "auto-switch" | "auto" | "switch" | "disable" {
    return this.$themeConfig.darkmode || "auto-switch";
  }

  private mounted(): void {
    this.darkmode =
      (localStorage.getItem("darkmode") as "auto" | "on" | "off" | null) ||
      "auto";

    if (this.darkmodeConfig === "auto-switch")
      if (this.darkmode === "auto") this.setDarkmode("auto");
      else this.setDarkmode(this.darkmode);
    else if (this.darkmodeConfig === "auto") this.setDarkmode("auto");
    else if (this.darkmodeConfig === "switch") this.setDarkmode(this.darkmode);
    // disabled
    else this.setDarkmode("off");
  }

  setDarkmode(status: "on" | "off" | "auto"): void {
    if (status === "on") this.toggleDarkmode(true);
    else if (status === "off") this.toggleDarkmode(false);
    else {
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)")
        .matches;
      const isLightMode = window.matchMedia("(prefers-color-scheme: light)")
        .matches;

      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (event) => {
          if (event.matches) this.toggleDarkmode(true);
        });

      window
        .matchMedia("(prefers-color-scheme: light)")
        .addEventListener("change", (event) => {
          if (event.matches) this.toggleDarkmode(false);
        });

      if (isDarkMode) this.toggleDarkmode(true);
      else if (isLightMode) this.toggleDarkmode(false);
      else {
        const timeHour = new Date().getHours();

        this.toggleDarkmode(timeHour < 6 || timeHour >= 18);
      }
    }

    this.darkmode = status;
    localStorage.setItem("darkmode", status);
  }

  private toggleDarkmode(isDarkmode: boolean): void {
    const classes = document.body.classList;

    if (isDarkmode) changeClass(classes, ["theme-dark"], ["theme-light"]);
    else changeClass(classes, ["theme-light"], ["theme-dark"]);
  }
}
