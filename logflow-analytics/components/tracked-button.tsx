"use client"

import type React from "react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { useEventTracker } from "@/components/event-tracker-provider"

interface TrackedButtonProps extends ButtonProps {
  trackingId: string
  trackingName: string
  trackingMetadata?: Record<string, any>
}

export function TrackedButton({
  trackingId,
  trackingName,
  trackingMetadata,
  onClick,
  children,
  ...props
}: TrackedButtonProps) {
  const tracker = useEventTracker()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    tracker.trackClick(trackingId, trackingName, trackingMetadata)
    onClick?.(e)
  }

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  )
}
