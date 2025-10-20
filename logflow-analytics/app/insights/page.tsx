"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, AlertCircle, Target, Loader2, Lightbulb, AlertTriangle, CheckCircle } from "lucide-react"
import { eventTracker } from "@/lib/event-tracker"

export default function InsightsPage() {
  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [timeRange, setTimeRange] = useState("최근 7일")

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
          timeRange,
        }),
      })

      const data = await response.json()
      setReport(data.report)
    } catch (error) {
      console.error("[v0] Failed to generate report:", error)
      setReport(null)
    } finally {
      setLoading(false)
    }
  }

  const events = eventTracker.getEvents()
  const sessions = eventTracker.getSessions()

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            AI 인사이트
          </h1>
          <p className="text-muted-foreground text-lg">
            AI가 수집된 데이터를 분석하여 실행 가능한 인사이트를 제공합니다
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">데이터 수집</h3>
            </div>
            <p className="text-3xl font-bold">{events.length}</p>
            <p className="text-sm text-muted-foreground mt-1">총 이벤트</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">세션 분석</h3>
            </div>
            <p className="text-3xl font-bold">{sessions.length}</p>
            <p className="text-sm text-muted-foreground mt-1">총 세션</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <AlertCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">분석 준비</h3>
            </div>
            <p className="text-3xl font-bold">{events.length > 0 ? "완료" : "대기"}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {events.length > 0 ? "리포트 생성 가능" : "데이터 수집 중"}
            </p>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                AI 분석 리포트
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                수집된 데이터를 기반으로 AI가 자동으로 인사이트와 추천사항을 생성합니다
              </p>
            </div>
            <Button onClick={generateReport} disabled={loading || events.length === 0} size="lg">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  분석 중...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  리포트 생성
                </>
              )}
            </Button>
          </div>

          {events.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">분석할 데이터가 없습니다</p>
              <p className="text-sm mt-2">데모 페이지에서 이벤트를 생성하거나 실제 사용자 데이터를 수집해주세요</p>
            </div>
          )}

          {report && (
            <div className="space-y-6">
              {/* 주요 인사이트 */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  주요 인사이트
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {report.insights.map((insight: any, index: number) => (
                    <Card key={index} className="p-5 bg-blue-500/5 border-blue-500/20">
                      <h4 className="font-semibold text-blue-400 mb-2">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                      {insight.metric && (
                        <div className="mt-3 pt-3 border-t border-blue-500/20">
                          <p className="text-2xl font-bold text-blue-400">{insight.metric}</p>
                          <p className="text-xs text-muted-foreground">{insight.metricLabel}</p>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              {/* 개선 추천사항 */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  개선 추천사항
                </h3>
                <div className="space-y-3">
                  {report.recommendations.map((rec: any, index: number) => (
                    <Card key={index} className="p-5 bg-yellow-500/5 border-yellow-500/20">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-yellow-400 mb-2">{rec.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{rec.description}</p>
                          {rec.impact && (
                            <div className="mt-3 flex items-center gap-2">
                              <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 font-medium">
                                예상 효과: {rec.impact}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 주의사항 */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  주의사항
                </h3>
                <div className="space-y-3">
                  {report.warnings.map((warning: any, index: number) => (
                    <Card key={index} className="p-5 bg-orange-500/5 border-orange-500/20">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-orange-400 mb-1">{warning.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{warning.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 다음 단계 */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  다음 단계
                </h3>
                <div className="space-y-3">
                  {report.nextSteps.map((step: any, index: number) => (
                    <Card key={index} className="p-5 bg-green-500/5 border-green-500/20">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-green-400">{step.title}</h4>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                              {step.priority}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 분석 메타데이터 */}
              <Card className="p-4 bg-muted/30">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>분석 완료 시간: {report.timestamp}</span>
                  <span>다음 분석 권장: {report.nextAnalysis}</span>
                </div>
              </Card>
            </div>
          )}

          {!report && events.length > 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">리포트를 생성할 준비가 되었습니다</p>
              <p className="text-sm mt-2">위의 "리포트 생성" 버튼을 클릭하여 AI 분석을 시작하세요</p>
            </div>
          )}
        </Card>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">AI 기반 차별화 기능</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong className="text-foreground">자동 리포트 생성:</strong> 수집된 데이터를 AI가 분석하여 실행
                    가능한 인사이트와 개선 추천사항을 자동으로 생성합니다
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong className="text-foreground">버튼 자동 라벨링:</strong> DOM 구조와 컨텍스트를 분석하여 버튼에
                    의미있는 라벨을 자동으로 부여합니다
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong className="text-foreground">패턴 인식:</strong> 사용자 행동 패턴을 자동으로 감지하고 이상
                    징후나 개선 기회를 식별합니다
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
