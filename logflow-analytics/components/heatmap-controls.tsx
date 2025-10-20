"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MousePointer2, Hand, Eye, Download } from "lucide-react"

export function HeatmapControls() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">히트맵 유형</h3>
          <Tabs defaultValue="click" className="w-full">
            <TabsList>
              <TabsTrigger value="click" className="gap-2">
                <MousePointer2 className="size-4" />
                클릭 맵
              </TabsTrigger>
              <TabsTrigger value="scroll" className="gap-2">
                <Hand className="size-4" />
                스크롤 맵
              </TabsTrigger>
              <TabsTrigger value="attention" className="gap-2">
                <Eye className="size-4" />
                주목도 맵
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">강도:</span>
            <Badge variant="secondary">높음</Badge>
          </div>
          <Button variant="outline" size="sm">
            <Download className="size-4 mr-2" />
            내보내기
          </Button>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <span className="text-sm font-medium">히트 스케일:</span>
        <div className="flex-1 h-8 rounded-lg overflow-hidden flex">
          <div className="flex-1 bg-blue-500/20" />
          <div className="flex-1 bg-green-500/40" />
          <div className="flex-1 bg-yellow-500/60" />
          <div className="flex-1 bg-orange-500/80" />
          <div className="flex-1 bg-red-500" />
        </div>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span>낮음</span>
          <span>높음</span>
        </div>
      </div>
    </Card>
  )
}
