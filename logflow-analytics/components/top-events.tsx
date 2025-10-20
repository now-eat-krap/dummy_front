"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { eventTracker } from "@/lib/event-tracker"

interface TopEvent {
  id: string
  name: string
  count: number
  percentage: number
}

export function TopEvents() {
  const [topEvents, setTopEvents] = useState<TopEvent[]>([])

  useEffect(() => {
    const updateTopEvents = () => {
      const events = eventTracker.getEvents()

      // Count events by elementId
      const eventCounts = events.reduce(
        (acc, event) => {
          const key = event.elementId
          if (!acc[key]) {
            acc[key] = {
              id: event.elementId,
              name: event.elementName,
              count: 0,
            }
          }
          acc[key].count++
          return acc
        },
        {} as Record<string, { id: string; name: string; count: number }>,
      )

      // Sort and get top 5
      const sorted = Object.values(eventCounts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

      const total = events.length || 1

      const topEventsWithPercentage = sorted.map((event) => ({
        ...event,
        percentage: (event.count / total) * 100,
      }))

      setTopEvents(topEventsWithPercentage)
    }

    updateTopEvents()
    const interval = setInterval(updateTopEvents, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <div className="space-y-2 mb-6">
        <h3 className="text-xl font-semibold">인기 이벤트</h3>
        <p className="text-sm text-muted-foreground">가장 많이 발생한 이벤트 Top 5</p>
      </div>

      <div className="space-y-4">
        {topEvents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>아직 이벤트가 없습니다.</p>
            <p className="text-sm mt-2">데모 페이지에서 이벤트를 생성해보세요.</p>
          </div>
        ) : (
          topEvents.map((event, index) => (
            <div key={event.id} className="flex items-center gap-4">
              <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                {index + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium truncate">{event.name}</p>
                  <Badge variant="secondary" className="text-xs">
                    {event.id}
                  </Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${event.percentage}%` }}
                  />
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">{event.count.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{event.percentage.toFixed(1)}%</p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
