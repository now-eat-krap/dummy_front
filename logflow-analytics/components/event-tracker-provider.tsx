"use client"

import { createContext, useContext, useEffect, type ReactNode } from "react"
import { eventTracker } from "@/lib/event-tracker"

const EventTrackerContext = createContext(eventTracker)

export function useEventTracker() {
  return useContext(EventTrackerContext)
}

interface EventTrackerProviderProps {
  children: ReactNode
}

export function EventTrackerProvider({ children }: EventTrackerProviderProps) {
  useEffect(() => {
    // Track initial page view
    eventTracker.trackPageView(document.title)

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        eventTracker.endSession()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      eventTracker.endSession()
    }
  }, [])

  return <EventTrackerContext.Provider value={eventTracker}>{children}</EventTrackerContext.Provider>
}
