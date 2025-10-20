"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface HeatPoint {
  x: number
  y: number
  intensity: number
  elementId: string
  clicks: number
}

const mockHeatPoints: HeatPoint[] = [
  { x: 20, y: 15, intensity: 0.9, elementId: "btn_login", clicks: 3421 },
  { x: 50, y: 25, intensity: 0.7, elementId: "btn_signup", clicks: 2847 },
  { x: 35, y: 45, intensity: 0.85, elementId: "btn_cta", clicks: 3102 },
  { x: 70, y: 35, intensity: 0.6, elementId: "link_products", clicks: 2103 },
  { x: 15, y: 60, intensity: 0.5, elementId: "btn_learn_more", clicks: 1876 },
  { x: 80, y: 55, intensity: 0.75, elementId: "btn_contact", clicks: 2654 },
  { x: 45, y: 70, intensity: 0.4, elementId: "link_about", clicks: 1245 },
  { x: 60, y: 80, intensity: 0.65, elementId: "btn_subscribe", clicks: 2387 },
]

export function HeatmapViewer() {
  const [selectedPoint, setSelectedPoint] = useState<HeatPoint | null>(null)

  const getHeatColor = (intensity: number) => {
    if (intensity >= 0.8) return "bg-red-500"
    if (intensity >= 0.6) return "bg-orange-500"
    if (intensity >= 0.4) return "bg-yellow-500"
    if (intensity >= 0.2) return "bg-green-500"
    return "bg-blue-500"
  }

  const getHeatSize = (intensity: number) => {
    const baseSize = 40
    return baseSize + intensity * 80
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2 p-6">
        <div className="space-y-2 mb-6">
          <h3 className="text-xl font-semibold">클릭 히트맵</h3>
          <p className="text-sm text-muted-foreground">페이지 내 클릭 분포 시각화</p>
        </div>

        <div className="relative w-full aspect-[16/10] bg-muted/30 rounded-lg border-2 border-dashed border-border overflow-hidden">
          {/* Mock page layout */}
          <div className="absolute inset-0 p-8">
            <div className="h-16 bg-card border rounded-lg mb-4 flex items-center px-6">
              <div className="size-8 rounded bg-primary/20" />
              <div className="ml-4 h-4 w-32 bg-muted rounded" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="h-32 bg-card border rounded-lg" />
              <div className="h-32 bg-card border rounded-lg" />
            </div>

            <div className="h-48 bg-card border rounded-lg mb-4" />

            <div className="grid grid-cols-3 gap-4">
              <div className="h-24 bg-card border rounded-lg" />
              <div className="h-24 bg-card border rounded-lg" />
              <div className="h-24 bg-card border rounded-lg" />
            </div>
          </div>

          {/* Heat points */}
          {mockHeatPoints.map((point) => {
            const size = getHeatSize(point.intensity)
            return (
              <button
                key={point.elementId}
                className={`absolute ${getHeatColor(point.intensity)} rounded-full opacity-60 hover:opacity-80 transition-all cursor-pointer`}
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: "translate(-50%, -50%)",
                  filter: "blur(20px)",
                }}
                onClick={() => setSelectedPoint(point)}
                aria-label={`Heat point for ${point.elementId}`}
              />
            )
          })}

          {/* Click markers */}
          {mockHeatPoints.map((point) => (
            <button
              key={`marker-${point.elementId}`}
              className="absolute size-3 bg-white border-2 border-primary rounded-full cursor-pointer hover:scale-150 transition-transform z-10"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => setSelectedPoint(point)}
              aria-label={`Click marker for ${point.elementId}`}
            />
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-2 mb-6">
          <h3 className="text-xl font-semibold">핫스팟</h3>
          <p className="text-sm text-muted-foreground">클릭이 집중된 영역</p>
        </div>

        {selectedPoint ? (
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 mb-4">
            <div className="flex items-center justify-between mb-2">
              <Badge className="text-xs">{selectedPoint.elementId}</Badge>
              <button
                onClick={() => setSelectedPoint(null)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                닫기
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">클릭 수:</span>
                <span className="font-semibold">{selectedPoint.clicks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">강도:</span>
                <span className="font-semibold">{(selectedPoint.intensity * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">위치:</span>
                <span className="font-semibold">
                  {selectedPoint.x}%, {selectedPoint.y}%
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-muted/50 mb-4 text-center text-sm text-muted-foreground">
            히트 포인트를 클릭하여 상세 정보를 확인하세요
          </div>
        )}

        <div className="space-y-3">
          {mockHeatPoints
            .sort((a, b) => b.clicks - a.clicks)
            .slice(0, 5)
            .map((point, index) => (
              <button
                key={point.elementId}
                onClick={() => setSelectedPoint(point)}
                className="w-full p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary font-semibold text-xs">
                      {index + 1}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {point.elementId}
                    </Badge>
                  </div>
                  <span className={`size-3 rounded-full ${getHeatColor(point.intensity)}`} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">클릭 수:</span>
                  <span className="font-semibold">{point.clicks.toLocaleString()}</span>
                </div>
              </button>
            ))}
        </div>
      </Card>
    </div>
  )
}
