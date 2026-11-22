import type { VueWrapper } from "@vue/test-utils";
import { config } from "@vue/test-utils";
import {
  resolveThemeLocaleData,
  themeLocaleDataSymbol,
  useThemeData,
} from "@vuepress/plugin-theme-data/client";
import type { TestClient, TestMountOptions } from "@vuepress/test-utils/client";
import { createTestClient } from "@vuepress/test-utils/client";
import type { TestClientOptions } from "@vuepress/test-utils/shared";
import { computed } from "vue";
import type { ClientConfig, ClientData } from "vuepress/client";
import { clientDataSymbol } from "vuepress/client";

import { enLocale } from "../../src/node/locales/en.js";

// The theme registers `VPIcon` globally in the real app
config.global.stubs = { VPIcon: true };

/** Theme data with the English locale resolved for every locale path */
export const themeData: Record<string, unknown> = {
  ...enLocale,
  locales: { "/": enLocale },
};

/**
 * Provide the theme locale data like `@vuepress/plugin-theme-data` does
 *
 * The client config of the plugin is not exported by its package, so the test client has to provide
 * the locale data manually. It has to be provided on the app, otherwise a `setup()` of another
 * client config cannot inject it.
 */
const themeLocaleClientConfig: ClientConfig = {
  enhance: ({ app }) => {
    const theme = useThemeData();
    // oxlint-disable-next-line no-underscore-dangle
    const { routeLocale } = app._context.provides[clientDataSymbol as symbol] as ClientData;

    app.provide(
      themeLocaleDataSymbol,
      computed(() => resolveThemeLocaleData(theme.value, routeLocale.value)),
    );
  },
};

/**
 * Create a test client with the English theme locale applied
 *
 * @param options - Test client options
 * @returns The test client
 */
export const createThemeClient = (options: TestClientOptions = {}): Promise<TestClient> =>
  createTestClient({
    page: { path: "/", title: "Test Page" },
    site: { base: "/", lang: "en-US", title: "Test Site" },
    ...options,
    clientConfigs: [themeLocaleClientConfig, ...(options.clientConfigs ?? [])],
    themeData: { ...themeData, ...options.themeData },
  });

/**
 * Mount a test client with the English theme locale applied
 *
 * @param options - Test client options
 * @returns The mounted wrapper
 */
export const mountTheme = async (
  options: TestClientOptions & TestMountOptions = {},
): Promise<VueWrapper> => {
  const { attachTo, ...clientOptions } = options;
  const client = await createThemeClient(clientOptions);

  return client.mount({ attachTo: attachTo ?? document.body });
};
