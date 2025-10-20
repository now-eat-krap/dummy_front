"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

const topPaths = [
  {
    id: "path_1",
    path: ["Home", "Products", "Product Detail", "Checkout", "Success"],
    users: 3240,
    conversionRate: 32.4,
    avgTime: "5m 24s",
  },
  {
    id: "path_2",
    path: ["Home", "Search", "Product Detail", "Checkout", "Success"],
    users: 2180,
    conversionRate: 21.8,
    avgTime: "4m 52s",
  },
  {
    id: "path_3",
    path: ["Home", "Products", "Product Detail", "Cart", "Checkout", "Success"],
    users: 1560,
    conversionRate: 15.6,
    avgTime: "6m 18s",
  },
  {
    id: "path_4",
    path: ["Home", "Categories", "Products", "Product Detail", "Success"],
    users: 980,
    conversionRate: 9.8,
    avgTime: "7m 05s",
  },
]

const dropoffPaths = [
  {
    id: "drop_1",
    path: ["Home", "Products", "Product Detail"],
    users: 2300,
    dropoffRate: 23.0,
    lastStep: "Product Detail",
  },
  {
    id: "drop_2",
    path: ["Home", "Products", "Product Detail", "Checkout"],
    users: 1400,
    dropoffRate: 14.0,
    lastStep: "Checkout",
  },
  {
    id: "drop_3",
    path: ["Home", "Search"],
    users: 890,
    dropoffRate: 8.9,
    lastStep: "Search",
  },
]

export function PathAnalysis() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <div className="space-y-2 mb-6">
          <h3 className="text-xl font-semibold">주요 전환 경로</h3>
          <p className="text-sm text-muted-foreground">가장 성공적인 사용자 경로</p>
        </div>

        <div className="space-y-4">
          {topPaths.map((item, index) => (
            <div key={item.id} className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary font-semibold text-xs">
                    {index + 1}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {item.users.toLocaleString()} 사용자
                  </Badge>
                  <Badge className="text-xs">{item.conversionRate}%</Badge>
                </div>
                <span className="text-xs text-muted-foreground">{item.avgTime}</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {item.path.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-center gap-2">
                    <span className="text-sm font-medium">{step}</span>
                    {stepIndex < item.path.length - 1 && <ArrowRight className="size-3 text-muted-foreground" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-2 mb-6">
          <h3 className="text-xl font-semibold">이탈 지점</h3>
          <p className="text-sm text-muted-foreground">사용자 이탈이 많은 경로</p>
        </div>

        <div className="space-y-4">
          {dropoffPaths.map((item, index) => (
            <div key={item.id} className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center size-6 rounded-full bg-red-500/10 text-red-500 font-semibold text-xs">
                    {index + 1}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {item.users.toLocaleString()} 사용자
                  </Badge>
                  <Badge variant="destructive" className="text-xs">
                    {item.dropoffRate}% 이탈
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap mb-2">
                {item.path.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${stepIndex === item.path.length - 1 ? "text-red-500" : ""}`}>
                      {step}
                    </span>
                    {stepIndex < item.path.length - 1 && <ArrowRight className="size-3 text-muted-foreground" />}
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                대부분의 사용자가 이탈하는 지점: <span className="text-red-500 font-medium">{item.lastStep}</span>
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
