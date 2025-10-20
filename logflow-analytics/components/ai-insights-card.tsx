"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export function AIInsightsCard() {
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">AI 기반 인사이트</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            수집된 데이터를 AI가 자동으로 분석하여 실행 가능한 인사이트와 개선 추천사항을 제공합니다. 구글 애널리틱스와
            달리 복잡한 설정 없이 즉시 이해할 수 있는 리포트를 받아보세요.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="px-3 py-1 bg-primary/10 rounded-full text-xs font-medium">자동 리포트 생성</div>
            <div className="px-3 py-1 bg-primary/10 rounded-full text-xs font-medium">버튼 자동 라벨링</div>
            <div className="px-3 py-1 bg-primary/10 rounded-full text-xs font-medium">패턴 인식</div>
          </div>
          <Link href="/insights">
            <Button className="gap-2">
              AI 인사이트 보기
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
