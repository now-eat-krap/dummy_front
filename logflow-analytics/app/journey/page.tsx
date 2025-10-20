import { DashboardHeader } from "@/components/dashboard-header"
import { JourneyFlow } from "@/components/journey-flow"
import { JourneyStats } from "@/components/journey-stats"
import { PathAnalysis } from "@/components/path-analysis"

export default function JourneyPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">사용자 여정</h1>
          <p className="text-muted-foreground text-lg">사용자 경로 및 행동 패턴 분석</p>
        </div>

        <JourneyStats />

        <JourneyFlow />

        <PathAnalysis />
      </main>
    </div>
  )
}
