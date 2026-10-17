import { defaultLayout } from "@/features/dashboard/defaultLayout"
import { widgetRegistry } from "@/features/dashboard/widgetRegistry"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import ReactGridLayout, { useContainerWidth } from "react-grid-layout"
import { toGridLayout } from "@/features/dashboard/gridConversion"

export default function DashboardPage() {

  const { width, containerRef, mounted } = useContainerWidth({ measureBeforeMount: true })

  return (
    <div ref={containerRef}>

      <h1 className="text-2xl font-bold text-[var(--text)]">Dashboard</h1>

      {mounted && (
        <ReactGridLayout
          width={width}
          layout={toGridLayout(defaultLayout)}
          gridConfig={{ cols: 12, rowHeight: 30 }}
        >
          {defaultLayout.map(function (item) {
            const Widget = widgetRegistry[item.type]

            if (Widget === undefined) {
              return null
            }

            return (
              <div key={item.id}>
                <Widget />
              </div>
            )
          })}

        </ReactGridLayout>
      )}

    </div>
  )
}
