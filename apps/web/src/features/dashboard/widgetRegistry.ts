import type { ComponentType } from "react";
import { WindSpeedWidget } from "@/features/dashboard/widgets/WindSpeedWidget";
import { SolarIrradianceWidget } from "@/features/dashboard/widgets/SolarIrradianceWidget";

export const widgetRegistry: Record<string, ComponentType> = {
  "wind-speed": WindSpeedWidget,
  "solar-irradiance": SolarIrradianceWidget,
};
