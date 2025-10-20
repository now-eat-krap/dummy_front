"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wand2, Loader2, Check } from "lucide-react"
import { eventTracker } from "@/lib/event-tracker"

interface AutoLabelButtonProps {
  elementId: string
  elementType: string
  context?: Record<string, any>
  onLabelGenerated?: (label: string) => void
}

export function AutoLabelButton({ elementId, elementType, context = {}, onLabelGenerated }: AutoLabelButtonProps) {
  const [loading, setLoading] = useState(false)
  const [labeled, setLabeled] = useState(false)

  const generateLabel = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/auto-label", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          elementId,
          elementType,
          context,
        }),
      })

      const data = await response.json()

      console.log("Generated label:", data)

      if (onLabelGenerated) {
        onLabelGenerated(data.label)
      }

      // Track the auto-labeling event
      eventTracker.track("custom", elementId, data.label, {
        category: data.category,
        description: data.description,
        autoLabeled: true,
      })

      setLabeled(true)
      setTimeout(() => setLabeled(false), 2000)
    } catch (error) {
      console.error("Failed to generate label:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button size="sm" variant="outline" onClick={generateLabel} disabled={loading || labeled}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
          생성 중...
        </>
      ) : labeled ? (
        <>
          <Check className="mr-2 h-3 w-3" />
          완료
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-3 w-3" />
          AI 라벨링
        </>
      )}
    </Button>
  )
}
