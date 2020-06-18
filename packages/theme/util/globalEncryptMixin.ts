import { Component, Vue } from "vue-property-decorator";
import { EncryptOptions } from "../types";
import { compareSync } from "bcryptjs";

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
      const result = globalPasswords.filter((globalPassword) =>
        compareSync(this.globalPassword, globalPassword)
      );

      return result.length === 0;
    }

    return false;
  }

  protected mounted(): void {
    const globalPassword = localStorage.getItem("globalPassword");

    if (globalPassword) this.globalPassword = globalPassword;
  }

  protected globalPasswordCheck(globalPassword: string): void {
    const { global } = this.encryptOptions as Required<EncryptOptions>;
    /** 全局密码 */
    const globalPasswords = typeof global === "string" ? [global] : global;
    /** 全局密码匹配结果 */
    const result = globalPasswords.filter((password) =>
      compareSync(globalPassword, password)
    );

    if (result.length !== 0) {
      this.globalPassword = globalPassword;
      localStorage.setItem("globalPassword", globalPassword);
    }
  }
}
