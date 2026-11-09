import { defaultLayout } from "@/features/dashboard/defaultLayout"
import { widgetRegistry } from "@/features/dashboard/widgetRegistry"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import ReactGridLayout, { useContainerWidth } from "react-grid-layout"
import { toGridLayout, fromGridLayout } from "@/features/dashboard/gridConversion"
import { useEffect, useState } from "react"
import PageLayoutDashboard from "@/components/layout/PageLayoutDashboard"
import { Button } from "@/components/ui/button"
import { getLayout, saveLayout } from "@/services/layout"
import { toast } from "sonner"
import type { LayoutItem } from "@climasight/types"

export default function DashboardPage() {

  const { width, containerRef, mounted } = useContainerWidth({ measureBeforeMount: true })
  const [layout, setLayout] = useState(defaultLayout)
  const [loadingLayout, setLoadingLayout] = useState(true)

  useEffect(function () {
    async function loadLayout() {
      const response = await getLayout()
      setLoadingLayout(false)
      if (response.error !== null) {
        console.error("Error fetching layout: " + response.error)
        return
      }
      if (response.data !== null) {
        const { layout: savedLayout } = response.data
        setLayout(savedLayout)
      }
    }
    loadLayout()
  }, [])

  function nextFreeRow(layout: LayoutItem[]): number {
    let bottomOccupiedRow = 0
    for (const item of layout) {
      const currentBottom = item.y + item.height
      if (currentBottom > bottomOccupiedRow) {
        bottomOccupiedRow = currentBottom
      }
    }
    return bottomOccupiedRow
  }

  function onAddWidget(type: string) {
    console.log(type)
    const newItem = {
      id: crypto.randomUUID(),
      type: type,
      x: 0,
      y: nextFreeRow(layout),
      width: 6,
      height:4
    }
    const newLayout = [...layout, newItem]
    setLayout(newLayout)
  }

  function onRemoveWidget(id: string) {
    const newLayout = layout.filter(function (item) {
      return item.id !== id
    })
    setLayout(newLayout)
  }

  async function onSaveLayout() {
    const payload = {
      version: 1,
      layout: layout
    }
    const response = await saveLayout(payload)
    if (response.error !== null) {
      console.error("Layout not saved: " + response.error)
      toast.error("Error! Layout could NOT be saved.")
      return
    }
    toast.success("Layout saved.")
  }

  return (
    <PageLayoutDashboard
      onAddWidget={onAddWidget}
      onSaveLayout={onSaveLayout}
    >
      <div ref={containerRef}>

        {/*<h1 className="text-2xl font-bold text-[var(--text)]">Dashboard</h1>*/}

        {loadingLayout && <p className="animate-pulse text-[var(--text-muted)]">
          Loading layout...
        </p>}

        {mounted && (
          <ReactGridLayout
            width={width}
            layout={toGridLayout(layout)}
            gridConfig={{ cols: 25, rowHeight: 15 }}
            onLayoutChange={function (newLayout) {
              const converted = fromGridLayout(newLayout, layout)
              setLayout(converted)
            }}
            >

            {layout.map(function (item) {
              const Widget = widgetRegistry[item.type]

              if (Widget === undefined) {
                return null
              }

              return (
                <div key={item.id} className="border border-[var(--text)]">
                  <Button
                    onClick={function () {
                      onRemoveWidget(item.id)
                    }}
                  >
                    X
                  </Button>
                  <Widget />
                </div>
              )
            })}
          </ReactGridLayout>
        )}
      </div>
    </PageLayoutDashboard>
  )
}
