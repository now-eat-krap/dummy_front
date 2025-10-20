"use client"

import type React from "react"

import { useState } from "react"
import { TrackedButton } from "@/components/tracked-button"
import { useEventTracker } from "@/components/event-tracker-provider"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AutoLabelButton } from "@/components/auto-label-button"

export default function DemoPage() {
  const tracker = useEventTracker()
  const [email, setEmail] = useState("")
  const [labeledButtons, setLabeledButtons] = useState<Record<string, string>>({})

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    tracker.trackFormSubmit("demo_form", "데모 가입 폼", { email })
    alert("폼이 제출되었습니다! 콘솔에서 추적된 이벤트를 확인하세요.")
  }

  const handleApiCall = async () => {
    tracker.trackApiCall("api_demo", "데모 API 호출", { endpoint: "/api/demo" })
    alert("API 호출이 추적되었습니다! 콘솔을 확인하세요.")
  }

  const handleLabelGenerated = (buttonId: string, label: string) => {
    setLabeledButtons((prev) => ({ ...prev, [buttonId]: label }))
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="size-4" />
          대시보드로 돌아가기
        </Link>

        <div className="space-y-2 mb-8">
          <h1 className="text-4xl font-bold">이벤트 추적 데모</h1>
          <p className="text-muted-foreground text-lg">이 페이지의 모든 상호작용이 추적됩니다</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">버튼 추적</h2>
            <p className="text-sm text-muted-foreground mb-4">각 버튼은 고유 ID로 추적됩니다</p>
            <div className="space-y-3">
              <TrackedButton trackingId="btn_primary_demo" trackingName="기본 데모 버튼" className="w-full">
                기본 버튼
              </TrackedButton>
              <TrackedButton
                trackingId="btn_secondary_demo"
                trackingName="보조 데모 버튼"
                variant="secondary"
                className="w-full"
              >
                보조 버튼
              </TrackedButton>
              <TrackedButton
                trackingId="btn_outline_demo"
                trackingName="외곽선 데모 버튼"
                variant="outline"
                className="w-full"
              >
                외곽선 버튼
              </TrackedButton>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">AI 자동 라벨링</h2>
            <p className="text-sm text-muted-foreground mb-4">
              AI가 버튼의 컨텍스트를 분석하여 자동으로 의미있는 라벨을 생성합니다
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <TrackedButton
                    trackingId="btn_unlabeled_1"
                    trackingName={labeledButtons["btn_unlabeled_1"] || "라벨 없는 버튼 1"}
                    variant="outline"
                  >
                    {labeledButtons["btn_unlabeled_1"] || "버튼 1"}
                  </TrackedButton>
                  <AutoLabelButton
                    elementId="btn_unlabeled_1"
                    elementType="button"
                    context={{ position: "top", section: "demo", purpose: "action" }}
                    onLabelGenerated={(label) => handleLabelGenerated("btn_unlabeled_1", label)}
                  />
                </div>
                {labeledButtons["btn_unlabeled_1"] && (
                  <p className="text-xs text-muted-foreground">생성된 라벨: {labeledButtons["btn_unlabeled_1"]}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <TrackedButton
                    trackingId="btn_unlabeled_2"
                    trackingName={labeledButtons["btn_unlabeled_2"] || "라벨 없는 버튼 2"}
                    variant="outline"
                  >
                    {labeledButtons["btn_unlabeled_2"] || "버튼 2"}
                  </TrackedButton>
                  <AutoLabelButton
                    elementId="btn_unlabeled_2"
                    elementType="button"
                    context={{ position: "middle", section: "demo", purpose: "navigation" }}
                    onLabelGenerated={(label) => handleLabelGenerated("btn_unlabeled_2", label)}
                  />
                </div>
                {labeledButtons["btn_unlabeled_2"] && (
                  <p className="text-xs text-muted-foreground">생성된 라벨: {labeledButtons["btn_unlabeled_2"]}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <TrackedButton
                    trackingId="btn_unlabeled_3"
                    trackingName={labeledButtons["btn_unlabeled_3"] || "라벨 없는 버튼 3"}
                    variant="outline"
                  >
                    {labeledButtons["btn_unlabeled_3"] || "버튼 3"}
                  </TrackedButton>
                  <AutoLabelButton
                    elementId="btn_unlabeled_3"
                    elementType="button"
                    context={{ position: "bottom", section: "demo", purpose: "submit" }}
                    onLabelGenerated={(label) => handleLabelGenerated("btn_unlabeled_3", label)}
                  />
                </div>
                {labeledButtons["btn_unlabeled_3"] && (
                  <p className="text-xs text-muted-foreground">생성된 라벨: {labeledButtons["btn_unlabeled_3"]}</p>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">폼 추적</h2>
            <p className="text-sm text-muted-foreground mb-4">폼 제출 이벤트를 추적합니다</p>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="text-sm font-medium mb-2 block">
                  이메일
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <TrackedButton trackingId="btn_form_submit" trackingName="데모 폼 제출" type="submit" className="w-full">
                폼 제출
              </TrackedButton>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">API 호출 추적</h2>
            <p className="text-sm text-muted-foreground mb-4">API 호출을 추적합니다</p>
            <TrackedButton
              trackingId="btn_api_call"
              trackingName="API 호출 트리거"
              onClick={handleApiCall}
              className="w-full"
            >
              API 호출
            </TrackedButton>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">세션 정보</h2>
            <p className="text-sm text-muted-foreground mb-4">현재 세션 정보를 확인합니다</p>
            <TrackedButton
              trackingId="btn_view_session"
              trackingName="세션 정보 보기"
              onClick={() => {
                const session = tracker.getCurrentSession()
                console.log("[LogFlow] 현재 세션:", session)
                alert("세션 정보가 콘솔에 출력되었습니다!")
              }}
              variant="outline"
              className="w-full"
            >
              세션 보기
            </TrackedButton>
          </Card>
        </div>

        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">개발자 도구</h2>
          <div className="flex gap-3">
            <TrackedButton
              trackingId="btn_view_events"
              trackingName="모든 이벤트 보기"
              onClick={() => {
                const events = tracker.getEvents()
                console.log("[LogFlow] 모든 이벤트:", events)
                alert(`${events.length}개의 이벤트가 콘솔에 출력되었습니다!`)
              }}
              variant="secondary"
            >
              모든 이벤트 보기
            </TrackedButton>
            <TrackedButton
              trackingId="btn_clear_data"
              trackingName="추적 데이터 삭제"
              onClick={() => {
                if (confirm("모든 추적 데이터를 삭제하시겠습니까?")) {
                  tracker.clearData()
                  alert("모든 데이터가 삭제되었습니다!")
                }
              }}
              variant="destructive"
            >
              데이터 삭제
            </TrackedButton>
          </div>
        </Card>
      </div>
    </div>
  )
}
