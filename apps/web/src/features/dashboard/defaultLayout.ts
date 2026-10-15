import type { LayoutItem } from "@climasight/types";

export const defaultLayout: LayoutItem[] = [
  {
    id: "widget-1",
    type: "wind-speed",
    x: 0,
    y: 0,
    width: 6,
    height: 4,
  },
  {
    id: "widget-2",
    type: "solar-irradiance",
    x: 6,
    y: 0,
    width: 6,
    height: 4,
  },
];
