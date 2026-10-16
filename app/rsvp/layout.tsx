import type { Metadata } from "next"

// Link previews for /rsvp (iMessage, WhatsApp, Facebook, ...) show the active event instead of the
// homepage: its title, date/time, location and flyer.

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
const PAGE_URL = "https://harmony4all.org/rsvp"
const LOGO_URL =
  "https://static.wixstatic.com/media/d717d4_f4049c46da4f4ceb9d3a42a4620c5ea9~mv2.jpg/v1/fill/w_175,h_99,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Social%20Media%20Kit%20(3)_edited.jpg"

type CurrentEvent = {
  title: string
  eventDate: string | null
  eventTime: string
  location: string
  flyer: { url: string; isPdf: boolean } | null
}

// Event dates are stored at noon UTC, so format in UTC to keep the same calendar day
const formatDate = (value: string | null) =>
  value
    ? new Date(value).toLocaleDateString("en-US", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : ""

async function getCurrentEvent(): Promise<CurrentEvent | null> {
  try {
    const response = await fetch(`${API_URL}/rsvp/events/current`, { next: { revalidate: 300 } })
    if (!response.ok) return null
    return (await response.json()).event
  } catch {
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const event = await getCurrentEvent()
  const title = event ? `RSVP: ${event.title}` : "RSVP | Harmony 4 All"
  const description = event
    ? [[formatDate(event.eventDate), event.eventTime].filter(Boolean).join(" · "), event.location.split(/\s*\n\s*/)[0]]
        .filter(Boolean)
        .join(" — ") || "Reserve your spot with Harmony 4 All."
    : "Reserve your spot at Harmony 4 All's next community concert."
  const image = event?.flyer && !event.flyer.isPdf ? event.flyer.url : LOGO_URL

  return {
    title,
    description,
    alternates: { canonical: PAGE_URL },
    openGraph: { title, description, url: PAGE_URL, siteName: "Harmony 4 All", type: "website", images: [{ url: image, alt: title }] },
    twitter: { card: event?.flyer && !event.flyer.isPdf ? "summary_large_image" : "summary", title, description, images: [image] },
  }
}

export default function RSVPLayout({ children }: { children: React.ReactNode }) {
  return children
}
