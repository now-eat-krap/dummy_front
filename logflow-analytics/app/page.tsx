import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCards } from "@/components/stats-cards"
import { EventsChart } from "@/components/events-chart"
import { TopEvents } from "@/components/top-events"
import { AIInsightsCard } from "@/components/ai-insights-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">분석 대시보드</h1>
          <p className="text-muted-foreground text-lg">실시간 사용자 행동 패턴 분석</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">주요 통계</h2>
            <Link href="/stats">
              <Button variant="ghost" className="gap-2">
                자세히보기
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
          <StatsCards />
        </div>

        <AIInsightsCard />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">이벤트 분석</h2>
            <Link href="/events">
              <Button variant="ghost" className="gap-2">
                자세히보기
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <EventsChart />
            <TopEvents />
          </div>
        </div>
      </main>
    </div>
  )
}
