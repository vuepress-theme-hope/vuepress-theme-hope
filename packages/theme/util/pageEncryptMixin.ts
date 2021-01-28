import { compareSync } from "bcryptjs";
import { Component, Vue } from "vue-property-decorator";
import { getPathMatchedKeys } from "./encrypt";

import type { EncryptOptions } from "../types";

@Component
export default class PageEncryptMixin extends Vue {
  protected encryptConfig: Record<string, string> = {};

  protected get encryptOptions(): EncryptOptions {
    return this.$themeConfig.encrypt || {};
  }

  protected get pathMatchKeys(): string[] {
    return getPathMatchedKeys(this.encryptConfig, this.$route.path);
  }

  protected get isPathEncrypted(): boolean {
    if (this.pathMatchKeys.length !== 0) {
      const { config } = this.encryptOptions as Required<EncryptOptions>;

      // none of the password matches
      return !this.pathMatchKeys.some((key) => {
        const keyConfig = config[key];
        const hitPasswords =
          typeof keyConfig === "string" ? [keyConfig] : keyConfig;

        return hitPasswords.some((encryptPassword) =>
          compareSync(this.encryptConfig[key], encryptPassword)
        );
      });
    }

    return false;
  }

  protected setPassword(password: string): void {
    const { config } = this.$themeConfig.encrypt as Required<EncryptOptions>;

    for (const hitKey of this.pathMatchKeys) {
      const hitPassword = config[hitKey];
      const hitPasswordList =
        typeof hitPassword === "string" ? [hitPassword] : hitPassword;

      // some of the password matches
      if (
        hitPasswordList.filter((encryptPassword) =>
          compareSync(password, encryptPassword)
        )
      ) {
        this.$set(this.encryptConfig, hitKey, password);
        localStorage.setItem(
          "encryptConfig",
          JSON.stringify(this.encryptConfig)
        );

        break;
      }
    }
  }

  protected mounted(): void {
    const passwordConfig = localStorage.getItem("encryptConfig");

    if (passwordConfig)
      this.encryptConfig = JSON.parse(passwordConfig) as Record<string, string>;
  }
}
