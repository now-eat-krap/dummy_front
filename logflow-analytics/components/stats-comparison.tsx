"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react"
import { eventTracker } from "@/lib/event-tracker"

export function StatsComparison() {
  const [comparison, setComparison] = useState([
    { period: "오늘", events: 0, users: 0, change: 0 },
    { period: "어제", events: 0, users: 0, change: 0 },
    { period: "이번 주", events: 0, users: 0, change: 0 },
    { period: "지난 주", events: 0, users: 0, change: 0 },
  ])

  useEffect(() => {
    const updateComparison = () => {
      const events = eventTracker.getEvents()
      const sessions = eventTracker.getSessions()
      const currentSession = eventTracker.getCurrentSession()
      const allSessions = currentSession ? [...sessions, currentSession] : sessions

      const now = Date.now()
      const todayStart = new Date().setHours(0, 0, 0, 0)
      const yesterdayStart = todayStart - 24 * 60 * 60 * 1000

      const todayEvents = events.filter((e) => e.timestamp >= todayStart).length
      const todayUsers = new Set(allSessions.filter((s) => s.startTime >= todayStart).map((s) => s.userId || s.id)).size

      const yesterdayEvents = events.filter((e) => e.timestamp >= yesterdayStart && e.timestamp < todayStart).length
      const yesterdayUsers = new Set(
        allSessions
          .filter((s) => s.startTime >= yesterdayStart && s.startTime < todayStart)
          .map((s) => s.userId || s.id),
      ).size

      const weekStart = now - 7 * 24 * 60 * 60 * 1000
      const lastWeekStart = now - 14 * 24 * 60 * 60 * 1000

      const thisWeekEvents = events.filter((e) => e.timestamp >= weekStart).length
      const thisWeekUsers = new Set(allSessions.filter((s) => s.startTime >= weekStart).map((s) => s.userId || s.id))
        .size

      const lastWeekEvents = events.filter((e) => e.timestamp >= lastWeekStart && e.timestamp < weekStart).length
      const lastWeekUsers = new Set(
        allSessions.filter((s) => s.startTime >= lastWeekStart && s.startTime < weekStart).map((s) => s.userId || s.id),
      ).size

      setComparison([
        { period: "오늘", events: todayEvents, users: todayUsers, change: 12.5 },
        { period: "어제", events: yesterdayEvents, users: yesterdayUsers, change: -3.2 },
        { period: "이번 주", events: thisWeekEvents, users: thisWeekUsers, change: 8.7 },
        { period: "지난 주", events: lastWeekEvents, users: lastWeekUsers, change: 5.1 },
      ])
    }

    updateComparison()
    const interval = setInterval(updateComparison, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <div className="space-y-2 mb-6">
        <h3 className="text-xl font-semibold">기간별 비교</h3>
        <p className="text-sm text-muted-foreground">기간별 이벤트 및 사용자 비교</p>
      </div>

      <div className="space-y-4">
        {comparison.map((item) => {
          const isPositive = item.change > 0
          return (
            <div key={item.period} className="p-4 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{item.period}</h4>
                <Badge variant={isPositive ? "default" : "secondary"} className="gap-1">
                  {isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                  {Math.abs(item.change)}%
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">이벤트</p>
                  <p className="text-2xl font-bold">{item.events.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">사용자</p>
                  <p className="text-2xl font-bold">{item.users.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
