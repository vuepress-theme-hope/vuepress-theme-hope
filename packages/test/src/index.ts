import { type PageData, type SiteData } from "vuepress/core";
import { vitest } from "vitest";
import {
  type App,
  type ComponentOptions,
  type FunctionalComponent,
  type VNode,
  defineComponent,
  getCurrentInstance,
  h,
  ref,
} from "vue";
import {
  type RouteLocation,
  type RouteLocationNormalizedLoaded,
  type RouteRecordRaw,
  type Router,
  createRouter,
  createWebHistory,
} from "vue-router";

export type MockPageOptions = Partial<PageData>;
export type MockSiteOptions = Partial<SiteData>;

export type MockRoute = Partial<RouteLocation> & Record<string, unknown>;
export type MockRouteRecord = Partial<RouteRecordRaw> &
  Pick<RouteRecordRaw, "path">;

export type MockGlobalOption = [name: string, value: unknown];

export interface MockOptions {
  /**
   * Current path
   */
  path?: string;
  page?: MockPageOptions;
  site?: MockSiteOptions;
  route?: MockRoute;
  routes?: MockRouteRecord[];
  /**
   * @default false
   */
  dev?: boolean;

  /**
   * @default true
   */
  ssr?: boolean;

  globals?: MockGlobalOption[];
}

export type Setup = (app: App) => void;

export const componentWrapper = <T>(
  component: T,
  setup: Setup = (): void => {
    // do nothing
  }
): T => <T>defineComponent({
    name: "TestWrapper",

    setup(props, { attrs, slots }) {
      const app = getCurrentInstance()!.appContext.app;

      setup(app);

      return (): VNode =>
        h(<ComponentOptions>component, { ...props, ...attrs }, slots);
    },
  });

export const setup = (
  vi: typeof vitest,
  {
    path = "/test",
    page = {},
    site = {},
    route = {},
    routes = [],
    dev = false,
    ssr = true,
    globals = [],
  }: MockOptions = {}
): Record<string, () => unknown> => {
  vi.stubGlobal("__VUEPRESS_BASE__", site.base ?? "/");
  vi.stubGlobal("__VUEPRESS_DEV__", dev);
  vi.stubGlobal("__VUEPRESS_SSR__", ssr);

  globals.forEach(([name, value]) => {
    vi.stubGlobal(name, value);
  });

  return {
    "@vuepress/client": () => {
      const pageDataMock: PageData = {
        path,
        title: "Test",
        frontmatter: {},
        lang: "en-US",
        headers: [],
        ...page,
      };
      const siteDataMock: SiteData = {
        title: "Test",
        description: "description",
        lang: "en-US",
        base: "/",
        head: [],
        ...site,
        locales: {
          ...site?.locales,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "/": {
            title: "Test",
            description: "description",
            lang: "en-US",
            ...site?.locales?.["/"],
          },
        },
      };

      return {
        usePageData: () => ref(pageDataMock),
        usePageFrontmatter: () => ref(pageDataMock.frontmatter),
        usePageLang: () => ref("en-US"),
        useRouteLocale: () => ref("/"),
        useSiteData: () => ref(siteDataMock),
      };
    },

    "vue-router": () => {
      const mockRoute: RouteLocation = {
        name: resolvePageKey({ path }),
        path,
        hash: "",
        fullPath: path,
        matched: [],
        query: {},
        redirectedFrom: undefined,
        params: {},
        meta: {},
        ...route,
      };

      const router = createRouter({
        history: createWebHistory(),
        routes: [
          getRouteRecord(<RouteRecordRaw>{ path, ...route }),
          ...routes.map((item) => getRouteRecord(item)),
        ],
      });

      const RouterLink: FunctionalComponent<
        Record<string, unknown>,
        Record<string, never>,
        { default?: () => VNode[] }
      > = (attrs, { slots }) => h("router-link", attrs, slots.default?.());

      return {
        useRouter: (): Router => router,
        useRoute: (): RouteLocationNormalizedLoaded => mockRoute,
        RouterLink,
      };
    },
  };
};

export const resetSetup = (vi: typeof vitest): void => {
  vi.unstubAllGlobals();
  vi.resetModules();
  vi.resetAllMocks();
};
