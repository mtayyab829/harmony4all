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

const STREET_SUFFIX =
  /^(.*?\b(?:st|street|rd|road|ave|avenue|blvd|boulevard|dr|drive|pl|place|ln|lane|way|pkwy|parkway|ct|court|ter|terrace|hwy|highway|sq|square|tpke|turnpike)\.?)\s+(.+)$/i

// ALL-CAPS admin text → "Title Case"; text with any lowercase is left as typed
function tidyCase(text: string) {
  return /[a-z]/.test(text) ? text : text.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase())
}

// Free-text location → [venue, street, "City, ST zip"], however the admin broke it up:
// "AT BROWNSON CENTER 127-15 KEW GARDENS RD\nKEW GARDENS\nNY 11415" → ["Brownson Center", "127-15 Kew Gardens Rd", "Kew Gardens, NY 11415"]
export function splitEventLocation(location: string | null | undefined) {
  const text = String(location || "").trim()
  const stateZip = text.match(/[\s,]+([a-z]{2})\.?[\s,]+(\d{5}(?:-\d{4})?)$/i)
  const streetStart = stateZip ? text.slice(0, stateZip.index).search(/(?:^|[\s,])\d+(?:-\d+)?\s+[a-z]/i) : -1
  if (stateZip && streetStart >= 0) {
    const before = text.slice(0, stateZip.index)
    const venue = before.slice(0, streetStart).replace(/^\s*at\s+/i, "").replace(/[\s,]+$/, "")
    const rest = before.slice(streetStart).replace(/^[\s,]+/, "")
    let street = rest
    let city = ""
    const lastBreak = Math.max(rest.lastIndexOf("\n"), rest.lastIndexOf(","))
    if (lastBreak > 0) {
      street = rest.slice(0, lastBreak)
      city = rest.slice(lastBreak + 1)
    } else {
      const suffix = rest.match(STREET_SUFFIX)
      if (suffix) [, street, city] = suffix
    }
    street = street.replace(/\s*\n\s*/g, " ").replace(/[\s,]+$/, "").trim()
    city = city.replace(/\s+/g, " ").trim()
    const cityLine = `${city ? `${tidyCase(city)}, ` : ""}${stateZip[1].toUpperCase()} ${stateZip[2]}`
    return [tidyCase(venue), tidyCase(street), cityLine].filter(Boolean)
  }

  // No recognizable "ST zip" ending: fall back to the admin's own lines/commas
  const lines = text.split(/\s*\n\s*/).map((line) => line.trim()).filter(Boolean)
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
