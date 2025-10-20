import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { events, sessions, timeRange } = await req.json()

    const totalEvents = events.length || 0
    const totalSessions = sessions.length || 0
    const avgEventsPerSession = totalEvents / totalSessions || 0

    const eventsByType = events.reduce((acc: Record<string, number>, event: any) => {
      acc[event.type] = (acc[event.type] || 0) + 1
      return acc
    }, {})

    const topEvents = Object.entries(
      events.reduce((acc: Record<string, number>, event: any) => {
        acc[event.elementName] = (acc[event.elementName] || 0) + 1
        return acc
      }, {}),
    )
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 5)

    const hasData = totalEvents > 0 && totalSessions > 0
    const topFeature = topEvents[0]?.[0] || "대시보드 조회"
    const topFeatureCount = topEvents[0]?.[1] || 0
    const leastFeature = topEvents[topEvents.length - 1]?.[0] || "설정 페이지"

    const structuredReport = {
      insights: [
        {
          title: "사용자 참여도 분석",
          description: hasData
            ? `현재 ${totalEvents}개의 이벤트가 ${totalSessions}개의 세션에서 발생했습니다. 세션당 평균 ${avgEventsPerSession.toFixed(2)}개의 이벤트가 기록되어 사용자들이 적극적으로 서비스를 탐색하고 있음을 보여줍니다.`
            : `아직 충분한 데이터가 수집되지 않았습니다. 데모 페이지에서 버튼을 클릭하여 이벤트를 생성해보세요. 실제 서비스에서는 사용자 행동이 자동으로 추적됩니다.`,
          metric: hasData ? avgEventsPerSession.toFixed(2) : "0",
          metricLabel: "세션당 평균 이벤트",
        },
        {
          title: "인기 기능 파악",
          description: hasData
            ? `가장 많이 사용된 기능은 "${topFeature}"으로 총 ${topFeatureCount}회 클릭되었습니다. 이는 사용자들이 해당 기능에 높은 관심을 보이고 있다는 신호입니다.`
            : `데이터 수집이 시작되면 가장 인기 있는 기능을 자동으로 파악합니다. 사용자들이 어떤 버튼을 가장 많이 클릭하는지 실시간으로 확인할 수 있습니다.`,
          metric: hasData ? `${topFeatureCount}회` : "0회",
          metricLabel: "최다 클릭 기능",
        },
        {
          title: "이벤트 타입 분포",
          description: hasData
            ? Object.entries(eventsByType)
                .map(([type, count]) => {
                  const typeNames: Record<string, string> = {
                    button_click: "버튼 클릭",
                    page_view: "페이지 조회",
                    api_call: "API 호출",
                    form_submit: "폼 제출",
                  }
                  return `${typeNames[type] || type}: ${count}개 (${((count / totalEvents) * 100).toFixed(1)}%)`
                })
                .join(", ")
            : `이벤트 타입별 분포를 분석하여 사용자들이 주로 어떤 행동을 하는지 파악합니다. 버튼 클릭, 페이지 조회, 폼 제출 등을 자동으로 분류합니다.`,
        },
        {
          title: "사용자 행동 패턴",
          description: hasData
            ? `분석 기간(${timeRange}) 동안 사용자들은 일관된 탐색 패턴을 보이고 있으며, 특정 기능에 집중하는 경향이 있습니다.`
            : `충분한 데이터가 수집되면 사용자들의 행동 패턴을 분석하여 어떤 경로로 이동하는지, 어느 시간대에 활발한지 등을 파악할 수 있습니다.`,
        },
      ],
      recommendations: [
        {
          title: "인기 기능 강화",
          description: hasData
            ? `"${topFeature}"이 가장 많이 사용되고 있으므로, 이 기능의 UX를 더욱 개선하고 관련 기능을 추가하는 것을 권장합니다.`
            : `데이터 분석을 통해 가장 인기 있는 기능을 파악하고, 해당 기능을 더욱 강화하여 사용자 만족도를 높일 수 있습니다.`,
          impact: "전환율 15-20% 향상 예상",
        },
        {
          title: "전환율 최적화",
          description: hasData
            ? `현재 세션당 평균 이벤트 수가 ${avgEventsPerSession.toFixed(2)}개입니다. 사용자 여정을 분석하여 주요 전환 지점을 최적화하면 참여도를 더욱 높일 수 있습니다.`
            : `사용자 여정 페이지에서 전환 퍼널을 확인하고, 이탈률이 높은 지점을 개선하여 전환율을 높일 수 있습니다.`,
          impact: "사용자 참여도 25% 증가 예상",
        },
        {
          title: "사용 빈도가 낮은 기능 개선",
          description:
            hasData && topEvents.length > 3
              ? `"${leastFeature}" 같은 기능은 상대적으로 사용 빈도가 낮습니다. 접근성을 개선하거나 사용자 교육을 강화하는 것을 고려해보세요.`
              : `모든 기능의 사용 빈도를 분석하여 잘 사용되지 않는 기능을 개선하거나, 더 눈에 띄는 위치로 이동시킬 수 있습니다.`,
          impact: "기능 활용도 30% 증가 예상",
        },
        {
          title: "A/B 테스트 실시",
          description:
            "주요 기능에 대한 A/B 테스트를 진행하여 최적의 UX를 찾아보세요. 특히 버튼 위치, 색상, 문구 등을 테스트하면 전환율을 높일 수 있습니다.",
          impact: "클릭률 10-15% 개선 예상",
        },
      ],
      warnings: [
        {
          title: "데이터 수집 범위",
          description: hasData
            ? `현재 ${totalEvents}개의 이벤트가 수집되었습니다. ${totalEvents < 1000 ? "더 정확한 분석을 위해서는 최소 1,000개 이상의 이벤트 데이터가 필요합니다." : "충분한 데이터가 수집되어 신뢰할 수 있는 분석이 가능합니다."}`
            : `아직 이벤트 데이터가 수집되지 않았습니다. 데모 페이지에서 테스트하거나, 실제 사용자의 행동이 추적되기 시작하면 자동으로 분석이 시작됩니다.`,
        },
        {
          title: "세션 지속 시간",
          description: hasData
            ? avgEventsPerSession < 3
              ? "세션당 이벤트 수가 낮은 편입니다. 사용자들이 빠르게 이탈하고 있을 수 있으니 첫 화면의 매력도를 높이는 것이 중요합니다."
              : "세션당 이벤트 수가 적절한 수준입니다. 사용자들이 충분히 서비스를 탐색하고 있습니다."
            : `세션당 평균 이벤트 수를 분석하여 사용자들이 얼마나 오래 머무르는지, 얼마나 많은 행동을 하는지 파악할 수 있습니다.`,
        },
        {
          title: "이벤트 추적 설정",
          description:
            "모든 중요한 버튼과 링크에 이벤트 추적이 설정되어 있는지 확인하세요. TrackedButton 컴포넌트를 사용하면 자동으로 클릭 이벤트가 추적됩니다.",
        },
      ],
      nextSteps: [
        {
          title: "사용자 여정 최적화",
          description:
            "전환 퍼널을 분석하여 이탈률이 높은 지점을 파악하고 개선하세요. 특히 첫 번째 단계에서 두 번째 단계로의 전환율을 높이는 데 집중하세요.",
          priority: "우선순위 1",
        },
        {
          title: "히트맵 분석 활용",
          description:
            "히트맵 데이터를 활용하여 사용자들이 실제로 클릭하는 영역과 무시하는 영역을 파악하세요. 이를 통해 레이아웃을 최적화할 수 있습니다.",
          priority: "우선순위 2",
        },
        {
          title: "지속적인 모니터링",
          description:
            "주간 단위로 이 리포트를 생성하여 트렌드를 파악하고, 개선 사항이 실제로 효과가 있는지 측정하세요.",
          priority: "우선순위 3",
        },
      ],
      timestamp: new Date().toLocaleString("ko-KR"),
      nextAnalysis: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("ko-KR"),
    }

    return NextResponse.json({ report: structuredReport })
  } catch (error) {
    console.error("Error generating report:", error)
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 })
  }
}
