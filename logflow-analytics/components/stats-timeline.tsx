"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useEffect, useState } from "react"
import { eventTracker } from "@/lib/event-tracker"

export function StatsTimeline() {
  const [chartData, setChartData] = useState<{ time: string; events: number; users: number; conversions: number }[]>([])

  useEffect(() => {
    const updateChart = () => {
      const events = eventTracker.getEvents()
      const now = Date.now()

      // Group by hour for the last 24 hours
      const last24Hours = Array.from({ length: 24 }, (_, i) => {
        const hourStart = now - (23 - i) * 60 * 60 * 1000
        const hourEnd = hourStart + 60 * 60 * 1000

        const hourEvents = events.filter((e) => e.timestamp >= hourStart && e.timestamp < hourEnd)
        const uniqueUsers = new Set(hourEvents.map((e) => e.sessionId)).size
        const conversions = hourEvents.filter((e) => e.type === "form_submit").length

        return {
          time: new Date(hourStart).getHours() + "시",
          events: hourEvents.length,
          users: uniqueUsers,
          conversions: conversions,
        }
      })

      setChartData(last24Hours)
    }

    updateChart()
    const interval = setInterval(updateChart, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <div className="space-y-2 mb-6">
        <h3 className="text-xl font-semibold">24시간 추이</h3>
        <p className="text-sm text-muted-foreground">시간대별 이벤트, 사용자, 전환 추이</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="time" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="events" stroke="hsl(var(--primary))" strokeWidth={2} name="이벤트" />
          <Line type="monotone" dataKey="users" stroke="hsl(var(--chart-2))" strokeWidth={2} name="사용자" />
          <Line type="monotone" dataKey="conversions" stroke="hsl(var(--chart-3))" strokeWidth={2} name="전환" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
