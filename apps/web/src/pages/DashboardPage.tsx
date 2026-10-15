import { defaultLayout } from "@/features/dashboard/defaultLayout"
import { widgetRegistry } from "@/features/dashboard/widgetRegistry"

export default function DashboardPage() {
  return (
    <>

      <h1 className="text-2xl font-bold text-[var(--text)]">Dashboard</h1>

      {defaultLayout.map(function (item) {
        const Widget = widgetRegistry[item.type]

        if (Widget === undefined) {
          return null
        }

        return <Widget key={item.id} />
      })}

    </>
  )
}
