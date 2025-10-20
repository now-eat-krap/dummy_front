"use client"

import { Button } from "@/components/ui/button"
import { Calendar, BarChart3, Route, Flame, Sparkles } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">LF</span>
            </div>
            <div>
              <h2 className="font-semibold text-lg">LogFlow</h2>
              <p className="text-xs text-muted-foreground">패턴 분석</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <BarChart3 className="size-4 mr-2" />
                대시보드
              </Button>
            </Link>
            <Link href="/journey">
              <Button variant="ghost" size="sm">
                <Route className="size-4 mr-2" />
                사용자 여정
              </Button>
            </Link>
            <Link href="/heatmap">
              <Button variant="ghost" size="sm">
                <Flame className="size-4 mr-2" />
                히트맵
              </Button>
            </Link>
            <Link href="/insights">
              <Button variant="ghost" size="sm">
                <Sparkles className="size-4 mr-2" />
                AI 인사이트
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/demo">
            <Button variant="outline" size="sm">
              데모 체험
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            <Calendar className="size-4 mr-2" />
            최근 7일
          </Button>
        </div>
      </div>
    </header>
  )
}
