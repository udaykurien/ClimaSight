import type { LayoutItem } from "@climasight/types";
import type { LayoutItem as GridItem } from "react-grid-layout";

export function toGridLayout(layout: LayoutItem[]): GridItem[] {
  return layout.map(function (item) {
    return {
      i: item.id,
      x: item.x,
      y: item.y,
      w: item.width,
      h: item.height
    }
  })
}
