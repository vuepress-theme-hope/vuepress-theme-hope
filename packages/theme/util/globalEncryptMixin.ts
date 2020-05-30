import { Component, Vue } from "vue-property-decorator";
import { EncryptOptions } from "../types";

@Component
export default class GlobalEncryptMixin extends Vue {
  /** 全局密码 */
  protected globalPassword = "";

  /** 加密配置 */
  protected get encryptOptions(): EncryptOptions {
    return this.$themeConfig.encrypt || {};
  }

  /** 全局加密状态 */
  protected get globalEncrypted(): boolean {
    if (this.encryptOptions.status === "global" && this.encryptOptions.global) {
      const { global } = this.encryptOptions;
      /** 全局密码 */
      const globalPasswords = typeof global === "string" ? [global] : global;
      /** 全局密码匹配结果 */
      const result = globalPasswords.filter(
        (globalPassword) => globalPassword === this.globalPassword
      );

      return result.length === 0;
    }

    return false;
  }

  protected mounted(): void {
    const passwordConfig = localStorage.getItem("globalPassword");

    if (passwordConfig) this.globalPassword = passwordConfig;
  }

  protected globalPasswordCheck(value: string): void {
    const { global } = this.encryptOptions as Required<EncryptOptions>;
    /** 全局密码 */
    const globalPasswords = typeof global === "string" ? [global] : global;
    /** 全局密码匹配结果 */
    const result = globalPasswords.filter(
      (globalPassword) => globalPassword === value
    );

    if (result.length !== 0) {
      this.globalPassword = value;
      localStorage.setItem("globalPassword", value);
    }
  }
}
