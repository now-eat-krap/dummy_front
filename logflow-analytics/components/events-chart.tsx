"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import { eventTracker } from "@/lib/event-tracker"

export function EventsChart() {
  const [chartData, setChartData] = useState<{ date: string; events: number }[]>([])

  useEffect(() => {
    const updateChart = () => {
      const events = eventTracker.getEvents()
      const now = Date.now()
      const days = ["일", "월", "화", "수", "목", "금", "토"]

      // Group events by day for the last 7 days
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(now - (6 - i) * 24 * 60 * 60 * 1000)
        const dayStart = new Date(date.setHours(0, 0, 0, 0)).getTime()
        const dayEnd = new Date(date.setHours(23, 59, 59, 999)).getTime()

        const dayEvents = events.filter((e) => e.timestamp >= dayStart && e.timestamp <= dayEnd)

        return {
          date: days[date.getDay()],
          events: dayEvents.length,
        }
      })

      setChartData(last7Days)
    }

    updateChart()
    const interval = setInterval(updateChart, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <div className="space-y-2 mb-6">
        <h3 className="text-xl font-semibold">이벤트 추이</h3>
        <p className="text-sm text-muted-foreground">최근 7일간 이벤트 발생 현황</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="date" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="events" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
