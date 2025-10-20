"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingDown, TrendingUp, Clock, Users, Target, AlertCircle } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const journeySteps = [
  {
    id: "step_1",
    name: "랜딩 페이지",
    users: 10000,
    dropoff: 0,
    conversionRate: 100,
    avgTime: "12초",
    bounceRate: 15,
    topSources: ["Google 검색", "직접 방문", "소셜 미디어"],
    devices: { mobile: 60, desktop: 35, tablet: 5 },
  },
  {
    id: "step_2",
    name: "제품 보기",
    users: 7500,
    dropoff: 2500,
    conversionRate: 75,
    avgTime: "1분 23초",
    bounceRate: 25,
    topSources: ["내부 링크", "검색", "추천"],
    devices: { mobile: 55, desktop: 40, tablet: 5 },
  },
  {
    id: "step_3",
    name: "장바구니 추가",
    users: 5200,
    dropoff: 2300,
    conversionRate: 52,
    avgTime: "45초",
    bounceRate: 30.7,
    topSources: ["제품 페이지", "위시리스트", "추천"],
    devices: { mobile: 50, desktop: 45, tablet: 5 },
  },
  {
    id: "step_4",
    name: "결제 시작",
    users: 3800,
    dropoff: 1400,
    conversionRate: 38,
    avgTime: "2분 15초",
    bounceRate: 26.9,
    topSources: ["장바구니", "빠른 구매"],
    devices: { mobile: 45, desktop: 50, tablet: 5 },
  },
  {
    id: "step_5",
    name: "결제 완료",
    users: 3240,
    dropoff: 560,
    conversionRate: 32.4,
    avgTime: "1분 34초",
    bounceRate: 14.7,
    topSources: ["결제 페이지"],
    devices: { mobile: 40, desktop: 55, tablet: 5 },
  },
]

const timeSeriesData = [
  { time: "00:00", step1: 850, step2: 640, step3: 440, step4: 320, step5: 270 },
  { time: "04:00", step1: 420, step2: 315, step3: 220, step4: 160, step5: 135 },
  { time: "08:00", step1: 1200, step2: 900, step3: 625, step4: 455, step5: 390 },
  { time: "12:00", step1: 1500, step2: 1125, step3: 780, step4: 570, step5: 485 },
  { time: "16:00", step1: 1800, step2: 1350, step3: 935, step4: 685, step5: 585 },
  { time: "20:00", step1: 2100, step2: 1575, step3: 1090, step4: 800, step5: 680 },
]

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]

export default function FunnelDetailPage() {
  const overallConversion = ((journeySteps[journeySteps.length - 1].users / journeySteps[0].users) * 100).toFixed(1)
  const totalDropoff = journeySteps[0].users - journeySteps[journeySteps.length - 1].users

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">전환 퍼널 상세 분석</h1>
          <p className="text-muted-foreground text-lg">단계별 사용자 행동 및 전환율 심층 분석</p>
        </div>

        {/* 전체 요약 카드 */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="size-5 text-blue-500" />
              </div>
              <span className="text-sm text-muted-foreground">총 유입</span>
            </div>
            <div className="text-3xl font-bold">{journeySteps[0].users.toLocaleString()}명</div>
            <p className="text-xs text-muted-foreground mt-1">최근 7일</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Target className="size-5 text-green-500" />
              </div>
              <span className="text-sm text-muted-foreground">전환 완료</span>
            </div>
            <div className="text-3xl font-bold">{journeySteps[journeySteps.length - 1].users.toLocaleString()}명</div>
            <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
              <TrendingUp className="size-3" />
              전환율 {overallConversion}%
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <TrendingDown className="size-5 text-red-500" />
              </div>
              <span className="text-sm text-muted-foreground">총 이탈</span>
            </div>
            <div className="text-3xl font-bold">{totalDropoff.toLocaleString()}명</div>
            <p className="text-xs text-red-500 mt-1">
              {((totalDropoff / journeySteps[0].users) * 100).toFixed(1)}% 이탈률
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Clock className="size-5 text-purple-500" />
              </div>
              <span className="text-sm text-muted-foreground">평균 소요 시간</span>
            </div>
            <div className="text-3xl font-bold">5분 49초</div>
            <p className="text-xs text-muted-foreground mt-1">전체 여정</p>
          </Card>
        </div>

        {/* 시간대별 퍼널 추이 */}
        <Card className="p-6">
          <div className="space-y-2 mb-6">
            <h3 className="text-xl font-semibold">시간대별 퍼널 추이</h3>
            <p className="text-sm text-muted-foreground">24시간 동안의 각 단계별 사용자 수</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="time" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="step1" stroke="#3b82f6" strokeWidth={2} name="랜딩 페이지" />
              <Line type="monotone" dataKey="step2" stroke="#8b5cf6" strokeWidth={2} name="제품 보기" />
              <Line type="monotone" dataKey="step3" stroke="#ec4899" strokeWidth={2} name="장바구니" />
              <Line type="monotone" dataKey="step4" stroke="#f59e0b" strokeWidth={2} name="결제 시작" />
              <Line type="monotone" dataKey="step5" stroke="#10b981" strokeWidth={2} name="결제 완료" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* 단계별 상세 분석 */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">단계별 상세 분석</h3>

          {journeySteps.map((step, index) => {
            const isLast = index === journeySteps.length - 1
            const deviceData = [
              { name: "모바일", value: step.devices.mobile, color: "#3b82f6" },
              { name: "데스크톱", value: step.devices.desktop, color: "#8b5cf6" },
              { name: "태블릿", value: step.devices.tablet, color: "#ec4899" },
            ]

            return (
              <Card key={step.id} className="p-6">
                <div className="space-y-6">
                  {/* 단계 헤더 */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center size-12 rounded-full bg-primary text-primary-foreground font-bold text-lg shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold">{step.name}</h4>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant="secondary">
                            <Clock className="size-3 mr-1" />
                            평균 {step.avgTime}
                          </Badge>
                          <Badge variant="secondary">
                            <Users className="size-3 mr-1" />
                            {step.users.toLocaleString()} 사용자
                          </Badge>
                          <Badge variant="outline" className="text-primary border-primary">
                            전환율 {step.conversionRate}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 통계 그리드 */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">이탈률</div>
                      <div className="text-2xl font-bold">{step.bounceRate}%</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">이탈 사용자</div>
                      <div className="text-2xl font-bold text-red-500">
                        {step.dropoff.toLocaleString()}명 이탈 (
                        {((step.dropoff / journeySteps[0].users) * 100).toFixed(1)}%)
                      </div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">다음 단계 진입</div>
                      <div className="text-2xl font-bold text-green-500">
                        {isLast ? "완벽한 전환" : `${journeySteps[index + 1].users.toLocaleString()}명`}
                      </div>
                    </div>
                  </div>

                  {/* 디바이스 분포 & 유입 경로 */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h5 className="font-semibold mb-4">디바이스 분포</h5>
                      <div className="flex items-center gap-6">
                        <ResponsiveContainer width={120} height={120}>
                          <PieChart>
                            <Pie
                              data={deviceData}
                              cx="50%"
                              cy="50%"
                              innerRadius={30}
                              outerRadius={50}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {deviceData.map((entry, i) => (
                                <Cell key={`cell-${i}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-2">
                          {deviceData.map((device) => (
                            <div key={device.name} className="flex items-center gap-2">
                              <div className="size-3 rounded-full" style={{ backgroundColor: device.color }} />
                              <span className="text-sm">{device.name}</span>
                              <span className="text-sm font-semibold ml-auto">{device.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-4">주요 유입 경로</h5>
                      <div className="space-y-3">
                        {step.topSources.map((source, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <span className="text-sm">{source}</span>
                            <Badge variant="secondary">{Math.floor(Math.random() * 30 + 20)}%</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 개선 제안 */}
                  {step.dropoff > 0 && (
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="size-5 text-amber-500 mt-0.5" />
                        <div>
                          <h6 className="font-semibold text-amber-500 mb-1">개선 제안</h6>
                          <p className="text-sm text-muted-foreground">
                            이 단계에서 {step.dropoff.toLocaleString()}명의 사용자가 이탈했습니다 (
                            {((step.dropoff / journeySteps[0].users) * 100).toFixed(1)}%). 페이지 로딩 속도 개선, UI/UX
                            최적화, 명확한 CTA 버튼 배치를 고려해보세요.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {!isLast && (
                  <div className="flex items-center justify-center mt-6 pt-6 border-t">
                    <ArrowRight className="size-6 text-muted-foreground" />
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
