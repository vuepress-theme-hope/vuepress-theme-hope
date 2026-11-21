import { renderVuePress } from "@vuepress/test-utils/client";
import { describe, expect, it } from "vitest";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import VPBanner from "../../src/client/components/VPBanner.js";
import VPCard from "../../src/client/components/VPCard.js";

describe("render vuepress", () => {
  it("should render a VPCard", async () => {
    const html = await renderVuePress({
      content: defineComponent({
        render: (): VNode =>
          h(VPCard, {
            title: "VuePress",
            desc: "Vue-powered static site generator",
            logo: "/logo.png",
          }),
      }),
    });

    expect(html).toContain('class="vp-card"');
    expect(html).toContain('<div class="vp-card-title">VuePress</div>');
    expect(html).toContain('<div class="vp-card-desc">Vue-powered static site generator</div>');
    expect(html).toContain('class="vp-card-logo"');
    expect(html).toContain('src="/logo.png"');
  });

  it("should render a VPCard as a link", async () => {
    const html = await renderVuePress({
      content: defineComponent({
        render: (): VNode => h(VPCard, { title: "Home", link: "/guide/" }),
      }),
    });

    expect(html).toMatch(/<a[^>]*class="route-link vp-card"/u);
    expect(html).toContain('href="/guide/"');
  });

  it("should render a VPBanner with actions", async () => {
    const html = await renderVuePress({
      content: defineComponent({
        render: (): VNode =>
          h(VPBanner, {
            title: "Banner title",
            content: "Banner content",
            actions: [
              { text: "External", link: "https://example.com" },
              { text: "Internal", link: "/guide/" },
            ],
          }),
      }),
    });

    expect(html).toContain('class="vp-banner"');
    expect(html).toContain('<div class="vp-banner-title">Banner title</div>');
    expect(html).toContain('<div class="vp-banner-content">Banner content</div>');
    expect(html).toMatch(
      /<a[^>]*class="vp-banner-action primary no-external-link-icon"[^>]*href="https:\/\/example\.com"/u,
    );
    expect(html).toContain(">External</a>");
    expect(html).toMatch(
      /<a[^>]*class="route-link vp-banner-action primary"[^>]*href="\/guide\/"/u,
    );
    expect(html).toContain(">Internal</a>");
  });
});
