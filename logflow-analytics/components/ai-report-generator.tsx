"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Loader2 } from "lucide-react"
import { eventTracker } from "@/lib/event-tracker"
import ReactMarkdown from "react-markdown"

export function AIReportGenerator() {
  const [report, setReport] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const generateReport = async () => {
    setLoading(true)
    try {
      const events = eventTracker.getEvents()
      const sessions = eventTracker.getSessions()

      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          events,
          sessions,
          timeRange: "최근 7일",
        }),
      })

      const data = await response.json()
      setReport(data.report)
    } catch (error) {
      console.error("Failed to generate report:", error)
      setReport("리포트 생성에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI 분석 리포트
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            수집된 데이터를 AI가 자동으로 분석하여 인사이트를 제공합니다
          </p>
        </div>
        <Button onClick={generateReport} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              생성 중...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              리포트 생성
            </>
          )}
        </Button>
      </div>

      {report && (
        <div className="prose prose-invert max-w-none mt-6 p-6 bg-muted/50 rounded-lg">
          <ReactMarkdown>{report}</ReactMarkdown>
        </div>
      )}
    </Card>
  )
}
