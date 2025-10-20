import { DashboardHeader } from "@/components/dashboard-header"
import { HeatmapViewer } from "@/components/heatmap-viewer"
import { HeatmapControls } from "@/components/heatmap-controls"
import { HeatmapStats } from "@/components/heatmap-stats"

export default function HeatmapPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">히트맵 분석</h1>
          <p className="text-muted-foreground text-lg">클릭 및 상호작용 히트맵 시각화</p>
        </div>

        <HeatmapStats />

        <HeatmapControls />

        <HeatmapViewer />
      </main>
    </div>
  )
}
