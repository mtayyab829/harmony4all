"use client"

import { Button } from "@/components/ui/button"
import { CalendarPlus, CheckCircle, Download, MapPin, Users } from "lucide-react"
import type { RsvpConfirmation as Confirmation, RsvpEvent } from "@/lib/api"
import { formatEventWhen } from "@/lib/rsvp-event"

type RSVPConfirmationProps = Confirmation & {
  event: RsvpEvent | null
  email: string
  guests: number
  message: string
  onReset: () => void
}

const partySize = (guests: number) => (guests === 1 ? "1 person" : `${guests} people`)

// Saves the check-in QR as a PNG with the guest's name underneath
async function downloadQr(qrDataUrl: string, fullName: string) {
  const qr = new Image()
  qr.src = qrDataUrl
  await qr.decode()

  const size = 480
  const padding = 40
  const canvas = document.createElement("canvas")
  canvas.width = size + padding * 2
  canvas.height = size + padding * 2 + 70
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(qr, padding, padding, size, size)

  // Shrink long names so they fit on one line
  let fontSize = 36
  do {
    ctx.font = `bold ${fontSize}px Arial, Helvetica, sans-serif`
    fontSize -= 2
  } while (ctx.measureText(fullName).width > size && fontSize > 14)
  ctx.fillStyle = "#000000"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(fullName, canvas.width / 2, padding + size + 35)

  const link = document.createElement("a")
  link.href = canvas.toDataURL("image/png")
  link.download = `Harmony4All-check-in-${fullName}.png`.replace(/[^\w.-]+/g, "-")
  link.click()
}

// Shown after a successful RSVP: the event details, the guest's check-in QR (downloadable with their
// name), Add to Calendar and directions
export default function RSVPConfirmation({ event, rsvp, eventLinks, guests, message, onReset }: RSVPConfirmationProps) {
  // No event open: the RSVP was saved as a contact only
  if (!event || !rsvp) {
    return (
      <div className="text-center py-6 space-y-4">
        <CheckCircle className="h-14 w-14 text-green-600 mx-auto" />
        <h2 className="text-2xl font-semibold text-gray-900">You're on the list!</h2>
        <p className="text-gray-600">{message}</p>
        <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-800">
          <Users className="h-4 w-4" />
          {partySize(guests)}
        </div>
        <div className="flex justify-center pt-2">
          <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-6" onClick={onReset}>
            RSVP someone else
          </Button>
        </div>
      </div>
    )
  }

  const when = eventLinks?.when || formatEventWhen(event)
  const fullName = `${rsvp.firstName} ${rsvp.lastName}`

  return (
    <div className="text-center py-2 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">🎶 Your RSVP Is Confirmed! 🎶</h2>
        <p className="text-gray-600">Thank you for joining us—we're delighted to celebrate with you!</p>
      </div>

      <div className="space-y-1">
        <p className="text-lg font-semibold text-gray-900">{event.title}</p>
        {when && <p className="text-gray-700">{when}</p>}
        {event.location && <p className="text-gray-700 whitespace-pre-line">{event.location}</p>}
        {event.description && <p className="text-sm text-gray-600 pt-2 whitespace-pre-line">{event.description}</p>}
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Your check-in pass</p>
        {rsvp.qrDataUrl && (
          <img
            src={rsvp.qrDataUrl}
            alt={`Check-in QR code for ${fullName}`}
            width={180}
            height={180}
            className="mx-auto mt-3 h-[180px] w-[180px]"
          />
        )}
        <p className="mt-1 text-xl font-bold text-gray-900">{fullName}</p>
        <p className="text-gray-700">Party of {rsvp.guests}</p>
        {rsvp.checkInCode && <p className="mt-1 font-mono tracking-widest text-gray-700">{rsvp.checkInCode}</p>}
      </div>

      {/* Icon-only actions, one row on every screen size */}
      <div className="flex flex-nowrap justify-center gap-4">
        {rsvp.qrDataUrl && (
          <Button
            size="icon"
            variant="outline"
            className="h-12 w-12 rounded-full border-black"
            aria-label="Download QR code"
            title="Download QR code"
            onClick={() => downloadQr(rsvp.qrDataUrl, fullName)}
          >
            <Download className="h-5 w-5" />
          </Button>
        )}
        {eventLinks?.googleCalendarUrl && (
          <Button asChild size="icon" variant="outline" className="h-12 w-12 rounded-full border-black">
            <a href={eventLinks.googleCalendarUrl} target="_blank" rel="noopener noreferrer" aria-label="Add to Google Calendar" title="Add to Google Calendar">
              <CalendarPlus className="h-5 w-5" />
            </a>
          </Button>
        )}
        {eventLinks?.directionsUrl && (
          <Button asChild size="icon" variant="outline" className="h-12 w-12 rounded-full border-black">
            <a href={eventLinks.directionsUrl} target="_blank" rel="noopener noreferrer" aria-label="Get directions" title="Get directions">
              <MapPin className="h-5 w-5" />
            </a>
          </Button>
        )}
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <p className="font-semibold text-gray-900">Questions or guest-count changes?</p>
        <p>
          <a href="mailto:info@harmony4all.org" className="underline hover:text-black">info@harmony4all.org</a>
          {" · "}
          <a href="tel:+17374276669" className="underline hover:text-black">(737) HARMONY (427-6669)</a>
        </p>
      </div>

      <div className="text-gray-700">
        <p>With Love and Gratitude,</p>
        <p className="font-semibold text-gray-900">Harmony 4 All</p>
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" className="rounded-full px-6" onClick={onReset}>
          RSVP someone else
        </Button>
      </div>
    </div>
  )
}
