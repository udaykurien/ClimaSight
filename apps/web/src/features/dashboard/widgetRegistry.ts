import { WindSpeedWidget } from "@/features/dashboard/widgets/WindSpeedWidget";
import { SolarIrradianceWidget } from "@/features/dashboard/widgets/SolarIrradianceWidget";

export const widgetRegistry = {
  "wind-speed": WindSpeedWidget,
  "solar-irradiance": SolarIrradianceWidget,
};
