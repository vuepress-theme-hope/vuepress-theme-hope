import { HopeVuepressConfig, ResolvedHopeVuepressConfig } from "./theme";
import "./declare";
import "./extend";

export * from "./theme";

export const config: (config: HopeVuepressConfig) => ResolvedHopeVuepressConfig;
