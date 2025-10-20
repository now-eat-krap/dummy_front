"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Users, MousePointer, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { eventTracker } from "@/lib/event-tracker"

export function StatsCards() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeUsers: 0,
    avgSession: "0m 0s",
    conversionRate: "0.00%",
  })

  useEffect(() => {
    const updateStats = () => {
      const events = eventTracker.getEvents()
      const sessions = eventTracker.getSessions()
      const currentSession = eventTracker.getCurrentSession()

      const allSessions = currentSession ? [...sessions, currentSession] : sessions
      const uniqueUsers = new Set(allSessions.map((s) => s.userId || s.id)).size

      // Calculate average session duration
      const totalDuration = allSessions.reduce((acc, session) => {
        return acc + (session.lastActivity - session.startTime)
      }, 0)
      const avgDurationMs = allSessions.length > 0 ? totalDuration / allSessions.length : 0
      const avgMinutes = Math.floor(avgDurationMs / 60000)
      const avgSeconds = Math.floor((avgDurationMs % 60000) / 1000)

      // Calculate conversion rate (form_submit events / total sessions)
      const conversions = events.filter((e) => e.type === "form_submit").length
      const conversionRate = allSessions.length > 0 ? (conversions / allSessions.length) * 100 : 0

      setStats({
        totalEvents: events.length,
        activeUsers: uniqueUsers,
        avgSession: `${avgMinutes}m ${avgSeconds}s`,
        conversionRate: `${conversionRate.toFixed(2)}%`,
      })
    }

    updateStats()
    const interval = setInterval(updateStats, 2000)

    return () => clearInterval(interval)
  }, [])

  const statsData = [
    {
      label: "총 이벤트",
      value: stats.totalEvents.toLocaleString(),
      change: "+12.5%",
      icon: MousePointer,
      trend: "up" as const,
    },
    {
      label: "활성 사용자",
      value: stats.activeUsers.toLocaleString(),
      change: "+8.2%",
      icon: Users,
      trend: "up" as const,
    },
    {
      label: "평균 세션",
      value: stats.avgSession,
      change: "-2.1%",
      icon: Clock,
      trend: "down" as const,
    },
    {
      label: "전환율",
      value: stats.conversionRate,
      change: "+5.7%",
      icon: TrendingUp,
      trend: "up" as const,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => {
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
