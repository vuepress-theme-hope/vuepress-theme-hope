import { HopeVuepressConfig, ResolvedHopeVuepressConfig } from "./hopeConfig";
import "./declare";
import "./extend";

export * from "./hopeConfig";

export const config: (config: HopeVuepressConfig) => ResolvedHopeVuepressConfig;
