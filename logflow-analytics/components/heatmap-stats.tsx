"use client"

import { Card } from "@/components/ui/card"
import { MousePointer2, Flame, Target, Zap } from "lucide-react"

const stats = [
  {
    label: "총 클릭 수",
    value: "45,892",
    change: "+18.2%",
    icon: MousePointer2,
    trend: "up",
  },
  {
    label: "핫스팟 영역",
    value: "12",
    change: "+3",
    icon: Flame,
    trend: "up",
  },
  {
    label: "평균 클릭 깊이",
    value: "3.8",
    change: "+0.5",
    icon: Target,
    trend: "up",
  },
  {
    label: "상호작용률",
    value: "76.4%",
    change: "+4.2%",
    icon: Zap,
    trend: "up",
  },
]

export function HeatmapStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="size-5 text-primary" />
              </div>
              <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {stat.change}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
