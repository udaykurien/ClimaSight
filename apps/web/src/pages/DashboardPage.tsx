import { defaultLayout } from "@/features/dashboard/defaultLayout"
import { widgetRegistry } from "@/features/dashboard/widgetRegistry"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import ReactGridLayout, { useContainerWidth } from "react-grid-layout"
import { toGridLayout, fromGridLayout } from "@/features/dashboard/gridConversion"
import { useState } from "react"
import PageLayoutDashboard from "@/components/layout/PageLayoutDashboard"

export default function DashboardPage() {

  const { width, containerRef, mounted } = useContainerWidth({ measureBeforeMount: true })
  const [layout, setLayout] = useState(defaultLayout)

  return (
    <PageLayoutDashboard>
    <div ref={containerRef}>

      <h1 className="text-2xl font-bold text-[var(--text)]">Dashboard</h1>

      {mounted && (
        <ReactGridLayout
          width={width}
          layout={toGridLayout(defaultLayout)}
          gridConfig={{ cols: 12, rowHeight: 30 }}
          onLayoutChange={function (newLayout) {
            setLayout(fromGridLayout(newLayout, layout))
          }}
        >
          {defaultLayout.map(function (item) {
            const Widget = widgetRegistry[item.type]

            if (Widget === undefined) {
              return null
            }

            return (
              <div key={item.id} className="border border-[var(--text)]">
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
