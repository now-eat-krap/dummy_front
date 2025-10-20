"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Users, MousePointer, Clock, ArrowUp, ArrowDown } from "lucide-react"
import { useEffect, useState } from "react"
import { eventTracker } from "@/lib/event-tracker"

export function StatsDetailCards() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeUsers: 0,
    avgSession: "0m 0s",
    conversionRate: "0.00%",
    eventGrowth: 0,
    userGrowth: 0,
    sessionGrowth: 0,
    conversionGrowth: 0,
  })

  useEffect(() => {
    const updateStats = () => {
      const events = eventTracker.getEvents()
      const sessions = eventTracker.getSessions()
      const currentSession = eventTracker.getCurrentSession()

      const allSessions = currentSession ? [...sessions, currentSession] : sessions
      const uniqueUsers = new Set(allSessions.map((s) => s.userId || s.id)).size

      const totalDuration = allSessions.reduce((acc, session) => {
        return acc + (session.lastActivity - session.startTime)
      }, 0)
      const avgDurationMs = allSessions.length > 0 ? totalDuration / allSessions.length : 0
      const avgMinutes = Math.floor(avgDurationMs / 60000)
      const avgSeconds = Math.floor((avgDurationMs % 60000) / 1000)

      const conversions = events.filter((e) => e.type === "form_submit").length
      const conversionRate = allSessions.length > 0 ? (conversions / allSessions.length) * 100 : 0

      setStats({
        totalEvents: events.length,
        activeUsers: uniqueUsers,
        avgSession: `${avgMinutes}m ${avgSeconds}s`,
        conversionRate: `${conversionRate.toFixed(2)}%`,
        eventGrowth: 12.5,
        userGrowth: 8.2,
        sessionGrowth: -2.1,
        conversionGrowth: 5.7,
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
      change: stats.eventGrowth,
      icon: MousePointer,
      description: "전체 기간 동안 발생한 이벤트 수",
      details: [
        { label: "오늘", value: Math.floor(stats.totalEvents * 0.3).toLocaleString() },
        { label: "이번 주", value: Math.floor(stats.totalEvents * 0.6).toLocaleString() },
        { label: "이번 달", value: stats.totalEvents.toLocaleString() },
      ],
    },
    {
      label: "활성 사용자",
      value: stats.activeUsers.toLocaleString(),
      change: stats.userGrowth,
      icon: Users,
      description: "현재 활동 중인 고유 사용자 수",
      details: [
        { label: "신규 사용자", value: Math.floor(stats.activeUsers * 0.4).toLocaleString() },
        { label: "재방문 사용자", value: Math.floor(stats.activeUsers * 0.6).toLocaleString() },
        { label: "총 사용자", value: stats.activeUsers.toLocaleString() },
      ],
    },
    {
      label: "평균 세션",
      value: stats.avgSession,
      change: stats.sessionGrowth,
      icon: Clock,
      description: "사용자당 평균 체류 시간",
      details: [
        { label: "최단 세션", value: "0m 15s" },
        { label: "평균 세션", value: stats.avgSession },
        { label: "최장 세션", value: "8m 42s" },
      ],
    },
    {
      label: "전환율",
      value: stats.conversionRate,
      change: stats.conversionGrowth,
      icon: TrendingUp,
      description: "목표 달성 비율",
      details: [
        { label: "전환 수", value: Math.floor(stats.activeUsers * 0.15).toLocaleString() },
        { label: "전환율", value: stats.conversionRate },
        { label: "목표", value: "20.00%" },
      ],
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {statsData.map((stat) => {
        const Icon = stat.icon
        const isPositive = stat.change > 0
        return (
          <Card key={stat.label} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="size-6 text-primary" />
              </div>
              <div className="flex items-center gap-1">
                {isPositive ? (
                  <ArrowUp className="size-4 text-green-600" />
                ) : (
                  <ArrowDown className="size-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                  {Math.abs(stat.change)}%
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>

              <div className="pt-4 border-t space-y-2">
                {stat.details.map((detail) => (
                  <div key={detail.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{detail.label}</span>
                    <span className="font-medium">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
