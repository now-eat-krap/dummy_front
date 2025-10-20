export type EventType = "click" | "api_call" | "page_view" | "form_submit" | "custom"

export interface LogEvent {
  id: string
  type: EventType
  elementId: string
  elementName: string
  timestamp: number
  sessionId: string
  userId?: string
  metadata?: Record<string, any>
  path: string
}

export interface Session {
  id: string
  userId?: string
  startTime: number
  lastActivity: number
  events: LogEvent[]
  path: string[]
}

class EventTracker {
  private sessionId: string
  private userId?: string
  private events: LogEvent[] = []
  private sessions: Session[] = []
  private currentSession: Session | null = null

  constructor() {
    this.sessionId = this.generateSessionId()
    this.initSession()
    this.loadFromStorage()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private generateEventId(): string {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private initSession() {
    if (typeof window === "undefined") return

    this.currentSession = {
      id: this.sessionId,
      userId: this.userId,
      startTime: Date.now(),
      lastActivity: Date.now(),
      events: [],
      path: [window.location.pathname],
    }
  }

  private loadFromStorage() {
    if (typeof window === "undefined") return

    const storedEvents = localStorage.getItem("logflow_events")
    const storedSessions = localStorage.getItem("logflow_sessions")

    if (storedEvents) {
      this.events = JSON.parse(storedEvents)
    }

    if (storedSessions) {
      this.sessions = JSON.parse(storedSessions)
    }
  }

  private saveToStorage() {
    if (typeof window === "undefined") return

    localStorage.setItem("logflow_events", JSON.stringify(this.events))
    localStorage.setItem("logflow_sessions", JSON.stringify(this.sessions))
  }

  setUserId(userId: string) {
    this.userId = userId
    if (this.currentSession) {
      this.currentSession.userId = userId
    }
  }

  track(type: EventType, elementId: string, elementName: string, metadata?: Record<string, any>) {
    if (typeof window === "undefined") return

    const event: LogEvent = {
      id: this.generateEventId(),
      type,
      elementId,
      elementName,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      metadata,
      path: window.location.pathname,
    }

    this.events.push(event)

    if (this.currentSession) {
      this.currentSession.events.push(event)
      this.currentSession.lastActivity = Date.now()

      if (!this.currentSession.path.includes(window.location.pathname)) {
        this.currentSession.path.push(window.location.pathname)
      }
    }

    this.saveToStorage()

    console.log("[LogFlow] Event tracked:", event)
  }

  trackClick(elementId: string, elementName: string, metadata?: Record<string, any>) {
    this.track("click", elementId, elementName, metadata)
  }

  trackApiCall(apiId: string, apiName: string, metadata?: Record<string, any>) {
    this.track("api_call", apiId, apiName, metadata)
  }

  trackPageView(pageName: string, metadata?: Record<string, any>) {
    const path = typeof window !== "undefined" ? window.location.pathname : pageName
    this.track("page_view", path, pageName, metadata)
  }

  trackFormSubmit(formId: string, formName: string, metadata?: Record<string, any>) {
    this.track("form_submit", formId, formName, metadata)
  }

  endSession() {
    if (this.currentSession) {
      this.sessions.push(this.currentSession)
      this.saveToStorage()
      this.currentSession = null
    }
  }

  getEvents(): LogEvent[] {
    return this.events
  }

  getSessions(): Session[] {
    return this.sessions
  }

  getCurrentSession(): Session | null {
    return this.currentSession
  }

  clearData() {
    this.events = []
    this.sessions = []
    this.currentSession = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("logflow_events")
      localStorage.removeItem("logflow_sessions")
    }
  }
}

export const eventTracker = new EventTracker()
