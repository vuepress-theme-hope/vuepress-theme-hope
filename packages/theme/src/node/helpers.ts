import { defineUserConfig } from "@vuepress/cli";
import type { UserConfig } from "@vuepress/cli";
import type { BundlerConfig } from "@vuepress/core";
import type {
  HopeThemeOptions,
  HopeThemeNavbarConfig,
  HopeThemeSidebarArrayConfig,
  HopeThemeSidebarConfig,
  HopeThemeSidebarObjectConfig,
} from "../shared";

export const defineHopeConfig = <T extends BundlerConfig>(
  config: UserConfig<HopeThemeOptions, T>
): UserConfig<HopeThemeOptions, T> =>
  defineUserConfig<HopeThemeOptions, T>({ theme: "hope", ...config });

export const defineThemeConfig = (
  themeConfig: HopeThemeOptions
): HopeThemeOptions => themeConfig;

export const defineNavbarConfig = (
  navbarConfig: HopeThemeNavbarConfig
): HopeThemeNavbarConfig => navbarConfig;

export const defineSidebarConfig = (
  sidebarConfig: HopeThemeSidebarConfig
): HopeThemeSidebarConfig => sidebarConfig;

export const defineSidebarArrayConfig = (
  sidebarConfig: HopeThemeSidebarArrayConfig
): HopeThemeSidebarArrayConfig => sidebarConfig;

export const defineSidebarObjectConfig = (
  sidebarConfig: HopeThemeSidebarObjectConfig
): HopeThemeSidebarObjectConfig => sidebarConfig;
