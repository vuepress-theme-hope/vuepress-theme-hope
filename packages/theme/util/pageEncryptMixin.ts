import { Component, Vue } from "vue-property-decorator";
import { EncryptOptions } from "../types";
import { compareSync } from "bcryptjs";

@Component
export default class PageEncryptMixin extends Vue {
  protected encryptConfig: Record<string, string> = {};

  /** 加密配置 */
  protected get encryptOptions(): EncryptOptions {
    return this.$themeConfig.encrypt || {};
  }

  /** 当前路径命中的键值 */
  protected get currentPathHitKeys(): string[] {
    if (this.encryptOptions && typeof this.encryptOptions.config === "object") {
      /** 配置键名 */
      const keys = Object.keys(this.encryptOptions.config);
      /** 命中键名 */
      const hitKeys = keys
        .filter((key) => this.$route.path.startsWith(key))
        .sort((a, b) => b.length - a.length);

      return hitKeys;
    }

    return [];
  }

  /** 路径是否加密 */
  protected get currentPathEncrypted(): boolean {
    if (this.currentPathHitKeys.length !== 0) {
      /** 配置项 */
      const { config } = this.encryptOptions as Required<EncryptOptions>;

      /** 正确键值 */
      const correctKeys = this.currentPathHitKeys.filter((key) => {
        const keyConfig = config[key];
        /** 命中的密码 */
        const hitPasswords =
          typeof keyConfig === "string" ? [keyConfig] : keyConfig;
        /** 比较结果 */
        const result = hitPasswords.filter((encryptPassword) =>
          compareSync(this.encryptConfig[key], encryptPassword)
        );

        return result.length !== 0;
      });

      return correctKeys.length === 0;
    }

    return false;
  }

  /** 设置密码 */
  protected setPassword(password: string): void {
    const { config } = this.$themeConfig.encrypt as Required<EncryptOptions>;

    for (const hitKey of this.currentPathHitKeys) {
      /** 命中密码配置 */
      const hitPassword = config[hitKey];
      /** 命中密码列表 */
      const hitPasswordList =
        typeof hitPassword === "string" ? [hitPassword] : hitPassword;
      /** 比较结果 */
      const result = hitPasswordList.filter((encryptPassword) =>
        compareSync(password, encryptPassword)
      );

      // 出现匹配
      if (result.length !== 0) {
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
