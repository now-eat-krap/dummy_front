"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import { eventTracker } from "@/lib/event-tracker"

export function EventsDetailChart() {
  const [chartData, setChartData] = useState<{ date: string; events: number }[]>([])

  useEffect(() => {
    const updateChart = () => {
      const events = eventTracker.getEvents()
      const now = Date.now()
      const days = ["일", "월", "화", "수", "목", "금", "토"]

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
      <Tabs defaultValue="bar" className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">이벤트 추이 분석</h3>
            <p className="text-sm text-muted-foreground">최근 7일간 이벤트 발생 패턴</p>
          </div>
          <TabsList>
            <TabsTrigger value="bar">막대 그래프</TabsTrigger>
            <TabsTrigger value="line">선 그래프</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="bar" className="space-y-4">
          <ResponsiveContainer width="100%" height={400}>
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
        </TabsContent>

        <TabsContent value="line" className="space-y-4">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
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
              <Line type="monotone" dataKey="events" stroke="hsl(var(--primary))" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
