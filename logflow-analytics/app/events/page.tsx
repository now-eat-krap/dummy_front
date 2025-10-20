import { DashboardHeader } from "@/components/dashboard-header"
import { EventsDetailChart } from "@/components/events-detail-chart"
import { EventsBreakdown } from "@/components/events-breakdown"
import { EventsTable } from "@/components/events-table"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">이벤트 상세</h1>
          <p className="text-muted-foreground text-lg">이벤트 발생 현황 및 상세 분석</p>
        </div>

        <EventsDetailChart />

        <div className="grid gap-6 lg:grid-cols-2">
          <EventsBreakdown />
          <EventsTable />
        </div>
      </main>
    </div>
  )
}
