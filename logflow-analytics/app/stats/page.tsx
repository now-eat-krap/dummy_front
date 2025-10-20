import { DashboardHeader } from "@/components/dashboard-header"
import { StatsDetailCards } from "@/components/stats-detail-cards"
import { StatsTimeline } from "@/components/stats-timeline"
import { StatsComparison } from "@/components/stats-comparison"

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">통계 상세</h1>
          <p className="text-muted-foreground text-lg">주요 지표의 상세 분석 및 추이</p>
        </div>

        <StatsDetailCards />

        <div className="grid gap-6 lg:grid-cols-2">
          <StatsTimeline />
          <StatsComparison />
        </div>
      </main>
    </div>
  )
}
