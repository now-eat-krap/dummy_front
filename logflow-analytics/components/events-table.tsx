"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { eventTracker, type TrackedEvent } from "@/lib/event-tracker"

export function EventsTable() {
  const [recentEvents, setRecentEvents] = useState<TrackedEvent[]>([])

  useEffect(() => {
    const updateEvents = () => {
      const events = eventTracker.getEvents()
      setRecentEvents(events.slice(-10).reverse())
    }

    updateEvents()
    const interval = setInterval(updateEvents, 2000)

    return () => clearInterval(interval)
  }, [])

  const getEventTypeBadge = (type: string) => {
    const variants: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
      button_click: { label: "버튼", variant: "default" },
      page_view: { label: "페이지", variant: "secondary" },
      api_call: { label: "API", variant: "outline" },
      form_submit: { label: "폼", variant: "default" },
    }
    const config = variants[type] || { label: type, variant: "secondary" as const }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <Card className="p-6">
      <div className="space-y-2 mb-6">
        <h3 className="text-xl font-semibold">최근 이벤트</h3>
        <p className="text-sm text-muted-foreground">실시간 이벤트 발생 내역</p>
      </div>

      <div className="space-y-3">
        {recentEvents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>아직 이벤트가 없습니다.</p>
            <p className="text-sm mt-2">데모 페이지에서 이벤트를 생성해보세요.</p>
          </div>
        ) : (
          recentEvents.map((event) => (
            <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50">
              {getEventTypeBadge(event.type)}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{event.elementName}</p>
                <p className="text-xs text-muted-foreground">{event.elementId}</p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                {new Date(event.timestamp).toLocaleTimeString("ko-KR")}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
