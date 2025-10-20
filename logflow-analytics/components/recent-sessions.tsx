"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { eventTracker, type Session } from "@/lib/event-tracker"

interface SessionDisplay {
  id: string
  user: string
  location: string
  duration: string
  events: number
  path: string
  timestamp: string
}

export function RecentSessions() {
  const [sessions, setSessions] = useState<SessionDisplay[]>([])

  useEffect(() => {
    const updateSessions = () => {
      const allSessions = eventTracker.getSessions()
      const currentSession = eventTracker.getCurrentSession()

      const sessionsToDisplay = currentSession ? [...allSessions, currentSession] : allSessions

      const displaySessions = sessionsToDisplay
        .slice(-4)
        .reverse()
        .map((session: Session) => {
          const duration = session.lastActivity - session.startTime
          const minutes = Math.floor(duration / 60000)
          const seconds = Math.floor((duration % 60000) / 1000)

          const timeAgo = Date.now() - session.lastActivity
          const minutesAgo = Math.floor(timeAgo / 60000)
          const timestamp = minutesAgo < 1 ? "방금 전" : `${minutesAgo}분 전`

          return {
            id: session.id,
            user: session.userId || session.id.slice(0, 12),
            location: "Seoul, KR",
            duration: `${minutes}m ${seconds}s`,
            events: session.events.length,
            path: session.path.join(" → ") || "Home",
            timestamp,
          }
        })

      setSessions(displaySessions)
    }

    updateSessions()
    const interval = setInterval(updateSessions, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <div className="space-y-2 mb-6">
        <h3 className="text-xl font-semibold">최근 세션</h3>
        <p className="text-sm text-muted-foreground">실시간 사용자 활동 추적</p>
      </div>

      <div className="space-y-4">
        {sessions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>아직 세션이 없습니다.</p>
            <p className="text-sm mt-2">페이지를 탐색하면 세션이 생성됩니다.</p>
          </div>
        ) : (
          sessions.map((session) => (
            <div key={session.id} className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{session.user}</p>
                    <Badge variant="outline" className="text-xs">
                      {session.events} events
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" />
                      {session.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {session.duration}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{session.timestamp}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">경로:</span>
                <span className="font-medium">{session.path}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
