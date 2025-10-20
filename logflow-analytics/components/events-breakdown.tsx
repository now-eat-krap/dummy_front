"use client"

import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { useEffect, useState } from "react"
import { eventTracker } from "@/lib/event-tracker"

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

export function EventsBreakdown() {
  const [pieData, setPieData] = useState<{ name: string; value: number }[]>([])

  useEffect(() => {
    const updatePieData = () => {
      const events = eventTracker.getEvents()

      const typeCounts = events.reduce(
        (acc, event) => {
          const typeNames: Record<string, string> = {
            button_click: "버튼 클릭",
            page_view: "페이지 조회",
            api_call: "API 호출",
            form_submit: "폼 제출",
          }
          const name = typeNames[event.type] || event.type
          acc[name] = (acc[name] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      const data = Object.entries(typeCounts).map(([name, value]) => ({ name, value }))
      setPieData(data)
    }

    updatePieData()
    const interval = setInterval(updatePieData, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <div className="space-y-2 mb-6">
        <h3 className="text-xl font-semibold">이벤트 유형별 분포</h3>
        <p className="text-sm text-muted-foreground">이벤트 타입별 발생 비율</p>
      </div>

      {pieData.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          <p>아직 이벤트가 없습니다.</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}
