import { MapPin } from "lucide-react"
import { eventDirectionsUrl, splitEventLocation } from "@/lib/rsvp-event"

// Venue, street and city/zip on their own lines; tapping opens directions in Google Maps (or the phone's map app)
export default function RSVPEventAddress({ location }: { location: string }) {
  const lines = splitEventLocation(location)
  if (!lines.length) return null

  return (
    <a
      href={eventDirectionsUrl(location)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Get directions to ${lines.join(", ")}`}
      className="group inline-flex flex-col items-center font-semibold text-gray-900 hover:text-gray-700"
    >
      {lines.map((line, i) => (
        <span key={i} className="underline decoration-gray-300 underline-offset-4 group-hover:decoration-gray-700">
          {line}
        </span>
      ))}
      <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-gray-500 group-hover:text-gray-700">
        <MapPin className="h-3.5 w-3.5" />
        Get directions
      </span>
    </a>
  )
}
