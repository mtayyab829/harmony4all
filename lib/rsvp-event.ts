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

// Only the start of the free-text time: "6:00 PM – 9:00 PM" → "6:00 PM", "6-9pm" → "6 PM"
export function formatStartTime(eventTime: string | null | undefined) {
  const text = String(eventTime || "").trim()
  const parts = text.split(/\s*(?:[-–—]|\bto\b|\buntil\b)\s*/i)
  let start = parts[0].trim()
  // "6-9 PM": the start borrows the end's AM/PM
  const meridiem = text.match(/[ap]\.?m\.?/i)
  if (parts.length > 1 && /\d/.test(start) && !/[ap]\.?m/i.test(start) && meridiem) start += ` ${meridiem[0]}`
  // "8:00 Am" / "8pm" → "8:00 AM" / "8 PM"
  return start.replace(/(\d)\s*([ap])\.?m\.?(?![a-z])/gi, (_, digit, ap) => `${digit} ${ap.toUpperCase()}M`)
}

// Free-text location → [venue, street, city/state/zip]. Line breaks from the admin are kept; a line that still
// holds "street, city, ST zip" is split at its first comma so the street and city each get their own line.
export function splitEventLocation(location: string | null | undefined) {
  const lines = String(location || "").split(/\s*\n\s*/).map((line) => line.trim()).filter(Boolean)
  if (lines.length === 1) {
    const parts = lines[0].split(/\s*,\s*/)
    // "Venue, 123 Main St, City, ST 10001": peel off the venue unless the first part is already a street number
    if (parts.length > 2 && !/^\d/.test(parts[0])) return [parts[0], parts[1], parts.slice(2).join(", ")]
    if (parts.length > 1 && /^\d/.test(parts[0])) return [parts[0], parts.slice(1).join(", ")]
    return lines
  }
  if (lines.length === 2 && lines[1].includes(",") && /^\d/.test(lines[1])) {
    const [street, ...rest] = lines[1].split(/\s*,\s*/)
    return [lines[0], street, rest.join(", ")]
  }
  return lines
}

export function eventDirectionsUrl(location: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(splitEventLocation(location).join(", "))}`
}

export function formatEventWhen(event: Pick<RsvpEvent, "eventDate" | "eventTime">, style: "long" | "short" = "long") {
  return [formatEventDate(event.eventDate, style), formatStartTime(event.eventTime)].filter(Boolean).join(" · ")
}
