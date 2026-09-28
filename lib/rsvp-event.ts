import type { RsvpEvent } from "@/lib/api"

// Event dates are stored as date-only values (noon UTC), so format in UTC to keep the same calendar day
export function formatEventDate(eventDate: string | null, style: "long" | "short" = "long") {
  if (!eventDate) return ""
  const date = new Date(eventDate)
  if (Number.isNaN(date.getTime())) return ""
  return date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: style === "long" ? "long" : "short",
    month: style === "long" ? "long" : "short",
    day: "numeric",
    year: "numeric",
  })
}

// RSVPs stay open through the end of the end date, New York time
export function formatRsvpDeadline(endDate: string | null | undefined) {
  if (!endDate) return ""
  const date = new Date(endDate)
  if (Number.isNaN(date.getTime())) return ""
  return date.toLocaleDateString("en-US", { timeZone: "America/New_York", month: "long", day: "numeric", year: "numeric" })
}

export function formatEventWhen(event: Pick<RsvpEvent, "eventDate" | "eventTime">, style: "long" | "short" = "long") {
  return [formatEventDate(event.eventDate, style), event.eventTime].filter(Boolean).join(" · ")
}
