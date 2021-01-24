import { HopeVuePressConfig, ResolvedHopeVuePressConfig } from "./theme";
import "./declare";
import "./extend";

export * from "./theme";

export const config: (config: HopeVuePressConfig) => ResolvedHopeVuePressConfig;
