"use client"

import { Card } from "@/components/ui/card"
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react"

const stats = [
  {
    label: "평균 경로 길이",
    value: "4.2",
    unit: "단계",
    change: "+0.3",
    icon: ArrowRight,
    trend: "up",
  },
  {
    label: "완료율",
    value: "68.5%",
    change: "+5.2%",
    icon: TrendingUp,
    trend: "up",
  },
  {
    label: "이탈률",
    value: "31.5%",
    change: "-3.1%",
    icon: Users,
    trend: "down",
  },
  {
    label: "평균 소요시간",
    value: "3m 24s",
    change: "-12s",
    icon: Zap,
    trend: "up",
  },
]

export function JourneyStats() {
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
              <p className="text-3xl font-bold">
                {stat.value}
                {stat.unit && <span className="text-lg text-muted-foreground ml-1">{stat.unit}</span>}
              </p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
