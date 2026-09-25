// oxlint-disable typescript/no-deprecated
import type { MediaPluginOptions } from "@vuepress/plugin-media";
import { describe, expect, it } from "vitest";

import { convertThemeOptions } from "../../src/node/compact/convertThemeOptions.js";

/**
 * Options of `vuepress-plugin-components`
 *
 * The removed options are still typed here, as they should be converted.
 */
interface LegacyComponentOptions {
  components?: string[];
  componentOptions?: Record<string, unknown>;
  locales?: Record<string, unknown>;
}

interface LegacyPluginOptions {
  components?: LegacyComponentOptions;
  media?: MediaPluginOptions | false;
}

const convert = (pluginOptions: LegacyPluginOptions): LegacyPluginOptions =>
  (convertThemeOptions({ plugins: pluginOptions }).plugins ?? {}) as LegacyPluginOptions;

describe("should convert media components to media plugin options", () => {
  it.each<[string, MediaPluginOptions]>([
    ["ArtPlayer", { artplayer: true }],
    ["AudioPlayer", { videojsAudio: true }],
    ["BiliBili", { embeds: ["bilibili"] }],
    ["PDF", { pdf: true }],
    ["VideoPlayer", { videojs: true }],
    // The two players of VidStack are replaced by Video.js
    ["VidStack", { videojs: true, videojsAudio: true }],
    ["YouTube", { embeds: ["youtube"] }],
  ])("should convert %s", (component, expected) => {
    const { components, media } = convert({ components: { components: [component] } });

    expect(media).toStrictEqual(expected);
    // The converted component is removed from the component plugin options
    expect(components).toStrictEqual({});
  });

  it("should keep the components that are not converted", () => {
    const { components, media } = convert({
      components: { components: ["ArtPlayer", "Badge", "VidStack", "VPCard"] },
    });

    expect(components).toStrictEqual({ components: ["Badge", "VPCard"] });
    expect(media).toStrictEqual({ artplayer: true, videojs: true, videojsAudio: true });
  });

  it("should accept the legacy array form of components", () => {
    const { components, media } = convert({
      components: ["ArtPlayer", "Badge"] as unknown as LegacyComponentOptions,
    });

    expect(components).toStrictEqual({ components: ["Badge"] });
    expect(media).toStrictEqual({ artplayer: true });
  });

  it("should merge with the existing media options", () => {
    const { media } = convert({
      components: { components: ["VidStack"] },
      media: { embeds: ["vimeo"], videojs: "hlsjs" },
    });

    expect(media).toStrictEqual({ embeds: ["vimeo"], videojs: "hlsjs", videojsAudio: true });
  });

  it("should not add the same embed twice", () => {
    const { media } = convert({
      components: { components: ["BiliBili", "YouTube"] },
      media: { embeds: ["bilibili"] },
    });

    expect(media).toStrictEqual({ embeds: ["bilibili", "youtube"] });
  });

  it("should convert artPlayer config to the artplayer option", () => {
    const { components, media } = convert({
      components: {
        components: ["ArtPlayer"],
        componentOptions: { artPlayer: { muted: true } },
      },
    });

    expect(media).toStrictEqual({ artplayer: { muted: true } });
    // The removed option is dropped
    expect(components?.componentOptions).not.toHaveProperty("artPlayer");
  });

  it("should keep the user artplayer option", () => {
    const { media } = convert({
      components: {
        components: ["ArtPlayer"],
        componentOptions: { artPlayer: { muted: true } },
      },
      media: { artplayer: { autoplay: true } },
    });

    expect(media).toStrictEqual({ artplayer: { autoplay: true } });
  });

  it("should drop the removed options of media components", () => {
    const { components, media } = convert({
      components: {
        components: ["PDF", "VidStack"],
        componentOptions: { pdf: { pdfjs: false } },
        locales: { pdf: { hint: "hint" }, vidstack: { Play: "Play" } },
      },
    });

    expect(media).toStrictEqual({ pdf: true, videojs: true, videojsAudio: true });
    expect(components?.componentOptions).not.toHaveProperty("pdf");
    expect(components?.locales).toStrictEqual({});
  });

  it("should not convert components when the media plugin is disabled", () => {
    const { components, media } = convert({
      components: { components: ["VidStack"] },
      media: false,
    });

    expect(media).toBe(false);
    expect(components).toStrictEqual({ components: ["VidStack"] });
  });

  it("should not touch other components", () => {
    const { components, media } = convert({ components: { components: ["Badge"] } });

    expect(components).toStrictEqual({ components: ["Badge"] });
    expect(media).toBeUndefined();
  });

  it("should not convert unknown component names", () => {
    const { components, media } = convert({
      components: { components: ["Badge", "constructor", "toString"] },
    });

    expect(components).toStrictEqual({ components: ["Badge", "constructor", "toString"] });
    expect(media).toBeUndefined();
  });

  it("should handle invalid components options", () => {
    expect(convert({ components: false as unknown as LegacyComponentOptions })).toStrictEqual({
      components: false,
    });
    expect(convert({ components: {} })).toStrictEqual({ components: {} });
    expect(convert({})).toStrictEqual({});
  });

  it("should be idempotent", () => {
    const themeOptions: Record<string, unknown> = {
      plugins: { components: { components: ["ArtPlayer", "Badge", "BiliBili"] } },
    };

    convertThemeOptions(themeOptions);

    const firstResult = structuredClone(themeOptions);

    convertThemeOptions(themeOptions);

    expect(themeOptions).toStrictEqual(firstResult);
  });
});
