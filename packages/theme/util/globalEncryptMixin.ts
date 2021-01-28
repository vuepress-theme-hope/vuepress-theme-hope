import { compareSync } from "bcryptjs";
import { Component, Vue } from "vue-property-decorator";

import type { EncryptOptions } from "../types";

@Component
export default class GlobalEncryptMixin extends Vue {
  protected globalPassword = "";

  protected get encryptOptions(): EncryptOptions {
    return this.$themeConfig.encrypt || {};
  }

  protected get isGlobalEncrypted(): boolean {
    if (this.encryptOptions.status === "global" && this.encryptOptions.global) {
      const { global } = this.encryptOptions;
      const globalPasswords = typeof global === "string" ? [global] : global;

      // none of the password matches
      return !globalPasswords.some((globalPassword) =>
        compareSync(this.globalPassword, globalPassword)
      );
    }

    return false;
  }

  protected mounted(): void {
    const globalPassword = localStorage.getItem("globalPassword");

    if (globalPassword) this.globalPassword = globalPassword;
  }

  protected checkGlobalPassword(globalPassword: string): void {
    const { global } = this.encryptOptions as Required<EncryptOptions>;
    const globalPasswords = typeof global === "string" ? [global] : global;

    if (
      // some of the password matches
      globalPasswords.some((password) => compareSync(globalPassword, password))
    ) {
      this.globalPassword = globalPassword;
      localStorage.setItem("globalPassword", globalPassword);
    }
  }
}
