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

export function fromGridLayout(grid: readonly GridItem[], current: LayoutItem[]): LayoutItem[] {
  return grid.map(function (gridItem) {
    const match = current.find(function (item) {
      return item.id === gridItem.i
    })

    if (match === undefined) {
      throw new Error("No layout item with id " + gridItem.i)
    }

    return {
      id: gridItem.i,
      type: match.type,
      x: gridItem.x,
      y: gridItem.y,
      width: gridItem.w,
      height: gridItem.h
    }
  })
}
