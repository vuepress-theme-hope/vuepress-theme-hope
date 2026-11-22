import { describe, expect, it } from "vitest";

import { AVAILABLE_SERVICES, SHARE_CONFIG } from "../../src/node/components/share/config.js";
import { getShareServiceConfig } from "../../src/node/components/share/getConfig.js";

describe(getShareServiceConfig, () => {
  it("should return the default share services in order", () => {
    expect(getShareServiceConfig().map(({ name }) => name)).toStrictEqual([
      "twitter",
      "facebook",
      "reddit",
      "telegram",
      "whatsapp",
      "email",
    ]);
  });

  it("should keep the order of the configured services", () => {
    expect(
      getShareServiceConfig({ services: ["email", "qq", "weibo"] }).map(({ name }) => name),
    ).toStrictEqual(["email", "qq", "weibo"]);
  });

  it("should fill a built-in service with its shared config", () => {
    const [email] = getShareServiceConfig({ services: ["email"] });

    expect(email).toStrictEqual({ name: "email", ...SHARE_CONFIG.email });
    expect(email.shape).toContain("<svg");
    expect(email.link).toContain("[title]");
  });

  it("should drop an unknown service", () => {
    expect(
      getShareServiceConfig({ services: ["unknown" as never, "email"] }).map(({ name }) => name),
    ).toStrictEqual(["email"]);
  });

  it("should replace the twitter user placeholder", () => {
    const [twitter] = getShareServiceConfig({
      services: ["twitter"],
      twitterUserName: "vuepress",
    });

    expect(twitter.link).toContain("vuepress");
    expect(twitter.link).not.toContain("[twitter-user]");
  });

  it("should keep a custom service and drop an invalid one", () => {
    const custom = {
      name: "custom",
      link: "https://example.com/share?url=[url]",
      shape: "<svg></svg>",
    };
    const services = getShareServiceConfig({
      services: [custom, { name: "invalid", link: "" } as never],
    });

    expect(services).toStrictEqual([custom]);
  });
});

describe("share config", () => {
  it("should expose every built-in service", () => {
    expect(AVAILABLE_SERVICES).toStrictEqual(Object.keys(SHARE_CONFIG));
    expect(AVAILABLE_SERVICES).toContain("twitter");
    expect(AVAILABLE_SERVICES).toContain("qrcode");
  });

  it("should give every service a link and an icon shape", () => {
    for (const service of AVAILABLE_SERVICES) {
      expect(SHARE_CONFIG[service].link).toBeTruthy();
      expect(SHARE_CONFIG[service].shape).toBeTruthy();
    }
  });
});
