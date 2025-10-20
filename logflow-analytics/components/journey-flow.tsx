"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, XCircle, ChevronRight } from "lucide-react"
import Link from "next/link"

const journeySteps = [
  {
    id: "step_1",
    name: "랜딩 페이지",
    users: 10000,
    dropoff: 0,
    conversionRate: 100,
    avgTime: "12초",
  },
  {
    id: "step_2",
    name: "제품 조회",
    users: 7500,
    dropoff: 2500,
    conversionRate: 75,
    avgTime: "1분 23초",
  },
  {
    id: "step_3",
    name: "장바구니 담기",
    users: 5200,
    dropoff: 2300,
    conversionRate: 52,
    avgTime: "45초",
  },
  {
    id: "step_4",
    name: "결제 시작",
    users: 3800,
    dropoff: 1400,
    conversionRate: 38,
    avgTime: "2분 15초",
  },
  {
    id: "step_5",
    name: "결제 완료",
    users: 3240,
    dropoff: 560,
    conversionRate: 32.4,
    avgTime: "1분 34초",
  },
]

export function JourneyFlow() {
  return (
    <Card className="p-6">
      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">전환 퍼널</h3>
            <p className="text-sm text-muted-foreground">단계별 사용자 전환 흐름</p>
          </div>
          <Link href="/funnel">
            <Button variant="outline" size="sm">
              자세히보기
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {journeySteps.map((step, index) => {
          const isLast = index === journeySteps.length - 1
          const maxWidth = 100
          const width = (step.users / journeySteps[0].users) * maxWidth

          return (
            <div key={step.id} className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm shrink-0">
                  {index + 1}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{step.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {step.avgTime}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">{step.users.toLocaleString()}명</span>
                      <span className="font-semibold text-primary">{step.conversionRate}%</span>
                    </div>
                  </div>

                  <div className="relative h-12 bg-muted rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80 flex items-center justify-end pr-4 transition-all"
                      style={{ width: `${width}%` }}
                    >
                      <span className="text-primary-foreground font-semibold text-sm">
                        {step.users.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {!isLast && (
                <div className="flex items-center gap-3 ml-12 pl-4">
                  {step.dropoff > 0 ? (
                    <>
                      <XCircle className="size-4 text-red-500" />
                      <span className="text-sm text-red-500 font-medium">
                        {step.dropoff.toLocaleString()}명 이탈 (
                        {((step.dropoff / journeySteps[0].users) * 100).toFixed(1)}%)
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="size-4 text-green-500" />
                      <span className="text-sm text-green-500 font-medium">완벽한 전환</span>
                    </>
                  )}
                  <ArrowRight className="size-4 text-muted-foreground ml-auto" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">전체 전환율</span>
          <span className="text-2xl font-bold text-primary">
            {((journeySteps[journeySteps.length - 1].users / journeySteps[0].users) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </Card>
  )
}
